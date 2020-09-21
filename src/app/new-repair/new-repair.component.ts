import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { ICar } from 'app/interfaces/car.interface';
import { IRepair } from 'app/interfaces/repair.interface';
import { CarsService } from 'app/services/cars/cars.service';
import { RepairsService } from 'app/services/repairs/repairs.service';

@Component({
  selector: 'app-new-repair',
  templateUrl: './new-repair.component.html',
  styleUrls: ['./new-repair.component.css']
})
export class NewRepairComponent implements OnInit {

  idCar: number;
  cars: ICar[] = [];

  formCar = new FormGroup({
    name: new FormControl('', [Validators.maxLength(50), Validators.required]),
    description: new FormControl('', [Validators.maxLength(400), Validators.required]),
    idCar: new FormControl('', [Validators.maxLength(50)]),
  });

  constructor(private _repairServices: RepairsService,
    private _snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<NewRepairComponent>,
    private _route: ActivatedRoute,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _carServices: CarsService
    ) { }

  ngOnInit(): void {
    this.idCar = this.data.id
    this.getCars();
  }

  openSnackBar(message: string, action: string, color: string) {
    this._snackBar.open(message, action, {
      duration: 3000,
      verticalPosition: 'bottom',
      horizontalPosition: 'right',
      panelClass: [color]
    });
  }

  displayFn(id: number): string {
    if (!id) { return ''; }
    const index = this.cars.findIndex(car => car.id === id);

    return this.cars[index].plate;
  }

  getCars(): void {

    this._carServices.getAll()
        .subscribe((data: ICar[]) => {
          this.cars = data;

          this.openSnackBar('Cars listed successfully', 'Success', 'success')
        }, error => {
          this.openSnackBar('Can\'t list Cars', 'ERROR!', 'error')
        })
  }

  createCar() {
    const repair: IRepair = {
      ...this.formCar.value
    };

    repair.idCar = this.idCar || this.formCar.value.idCar

    this._repairServices.save(repair)
      .subscribe(res => {
        this.openSnackBar('Repair saved successfully', 'Success', 'success')
        this.dialogRef.close();
      }, error => {
        this.openSnackBar(error.error.message, 'ERROR!', 'error')
      })
  }

}
