import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { ICar } from 'app/interfaces/car.interface';
import { NewClientComponent } from 'app/new-client/new-client.component';
import { CarsService } from 'app/services/cars/cars.service';

@Component({
  selector: 'app-client-cars',
  templateUrl: './client-cars.component.html',
  styleUrls: ['./client-cars.component.css']
})
export class ClientCarsComponent implements OnInit {

  cars: ICar[] = [];
  dialogRef: any;

  constructor(private _carServices: CarsService,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar,
    private _route: ActivatedRoute
  ) { }

  ngOnInit(): void {
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

  openDialog() {
    this.dialogRef = this.dialog.open(NewClientComponent, {
      minWidth: '300px',
      width: '60%',
      autoFocus: true
    });
    this.dialogRef.afterClosed().subscribe(() => {
      this.getCars();
    });
  }

  getCars(): void {
    this._route.params
      .filter(params => params.id)
      .subscribe(params => {
        this._carServices.getCarsByClient(params.id)
        .subscribe((data: ICar[]) => {
          this.cars = data;
          this.openSnackBar('Cars listed successfully', 'Success', 'success')
        }, error => {
          this.openSnackBar('Can\'t list Cars', 'ERROR!', 'error')
        })
      }
    );
  }
}