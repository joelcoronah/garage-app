import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { ICar } from 'app/interfaces/car.interface';
import { NewCarComponent } from 'app/new-car/new-car.component';
import { CarsService } from 'app/services/cars/cars.service';

@Component({
  selector: 'app-cars',
  templateUrl: './cars.component.html',
  styleUrls: ['./cars.component.css']
})
export class CarsComponent implements OnInit {

  displayedColumns: string[] = ['id', 'plate', 'model', 'brand', 'color', 'actions'];
  dataSource: any;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  cars: ICar[] = [];
  dialogRef: any;
  idClient: number;
  showSpinner = false;

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
      panelClass: [color],
    });
  }

  openDialog() {
    this.dialogRef = this.dialog.open(NewCarComponent, {
      minWidth: '300px',
      width: '60%',
      autoFocus: true,
      data: { id: this.idClient }
    });
    this.dialogRef.afterClosed().subscribe(() => {
      this.getCars();
    });
  }

  getCars(): void {
    this.showSpinner = true

    this._carServices.getAll()
        .subscribe((data: ICar[]) => {
          this.cars = data;

          this.dataSource = new MatTableDataSource<ICar>(data);
          this.dataSource.paginator = this.paginator;

          this.openSnackBar('Cars listed successfully', 'Success', 'success')
          setTimeout(() => {
            this.showSpinner = false
          }, 1000);
        }, error => {
          this.openSnackBar('Can\'t list Cars', 'ERROR!', 'error')
          setTimeout(() => {
            this.showSpinner = false
          }, 1000);
        })
  }

}
