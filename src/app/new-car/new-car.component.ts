import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CarsService } from 'app/services/cars/cars.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-new-car',
  template: 'passed in {{ data.id }}',
  templateUrl: './new-car.component.html',
  styleUrls: ['./new-car.component.css']
})
export class NewCarComponent implements OnInit {

  formCar = new FormGroup({
    brand: new FormControl('', [Validators.maxLength(50), Validators.required]),
    model: new FormControl('', [Validators.maxLength(50), Validators.required]),
    color: new FormControl('', [Validators.maxLength(50), Validators.required]),
    plate: new FormControl('', [Validators.maxLength(50), Validators.required]),
  });

  constructor(private _carService: CarsService,
    private _snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<NewCarComponent>,
    private _route: ActivatedRoute,
    @Inject(MAT_DIALOG_DATA) public data: any
    ) { }

  ngOnInit(): void {
  }

  openSnackBar(message: string, action: string, color: string) {
    this._snackBar.open(message, action, {
      duration: 3000,
      verticalPosition: 'bottom',
      horizontalPosition: 'right',
      panelClass: [color]
    });
  }

  createCar() {
    this._carService.save({...this.formCar.value, idUser: this.data.id})
      .subscribe(res => {
        this.openSnackBar('Car saved successfully', 'Success', 'success')
        this.dialogRef.close();
      }, error => {
        this.openSnackBar(error.error.message, 'ERROR!', 'error')
      })
  }
}
