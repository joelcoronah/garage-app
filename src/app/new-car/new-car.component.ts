import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CarsService } from 'app/services/cars/cars.service';
import { ActivatedRoute } from '@angular/router';
import { ClientsService } from 'app/services/clients/clients.service';
import { IClient } from 'app/interfaces/client.interface';
import { ICar } from 'app/interfaces/car.interface';

@Component({
  selector: 'app-new-car',
  template: 'passed in {{ data.id }}',
  templateUrl: './new-car.component.html',
  styleUrls: ['./new-car.component.css']
})
export class NewCarComponent implements OnInit {

  clients: IClient[] = [];
  idClient: number;

  formCar = new FormGroup({
    brand: new FormControl('', [Validators.maxLength(50), Validators.required]),
    model: new FormControl('', [Validators.maxLength(50), Validators.required]),
    color: new FormControl('', [Validators.maxLength(50), Validators.required]),
    plate: new FormControl('', [Validators.maxLength(50), Validators.required]),
    idUser: new FormControl('', [Validators.maxLength(50)]),
  });

  constructor(private _carService: CarsService,
    private _snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<NewCarComponent>,
    private _route: ActivatedRoute,
    private _clientServices: ClientsService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
    this.idClient = this.data.id
    this.getClients();
  }

  displayFn(id: number): string {
    if (!id) { return ''; }
    const index = this.clients.findIndex(client => client.id === id);
    const client = this.clients[index];

    return `${client.firstName} ${client.lastName}`;
  }

  getClients() {
    this._clientServices.getAll()
      .subscribe((data: IClient[]) => {
        this.clients = data;

        this.openSnackBar('Client listed successfully', 'Success', 'success')
      }, error => {
        this.openSnackBar('Can\'t list clients', 'ERROR!', 'error')
      })
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
    const car: ICar = {
      ...this.formCar.value
    };

    car.idUser = this.idClient || this.formCar.value.idUser

    this._carService.save(car)
      .subscribe(res => {
        this.openSnackBar('Car saved successfully', 'Success', 'success')
        this.dialogRef.close();
      }, error => {
        this.openSnackBar(error.error.message, 'ERROR!', 'error')
      })
  }
}
