import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { IRepair } from 'app/interfaces/repair.interface';
import { NewRepairComponent } from 'app/new-repair/new-repair.component';
import { RepairsService } from 'app/services/repairs/repairs.service';

@Component({
  selector: 'app-car-repairs',
  templateUrl: './car-repairs.component.html',
  styleUrls: ['./car-repairs.component.css']
})
export class CarRepairsComponent implements OnInit {

  repairs: IRepair[] = [];
  dialogRef: any;
  idCar: number;

  constructor(private _repairServices: RepairsService,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar,
    private _route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.getRepairs();
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
    this.dialogRef = this.dialog.open(NewRepairComponent, {
      minWidth: '300px',
      width: '60%',
      autoFocus: true,
      data: { id: this.idCar }
    });
    this.dialogRef.afterClosed().subscribe(() => {
      this.getRepairs();
    });
  }

  getRepairs(): void {
    this._route.params
      .filter(params => params.id)
      .subscribe(params => {
        this.idCar = params.id;
        this._repairServices.getRepairsByCar(params.id)
        .subscribe((data: IRepair[]) => {
          this.repairs = data;
          this.openSnackBar('Repairs listed successfully', 'Success', 'success')
        }, error => {
          this.openSnackBar('Can\'t list Repairs', 'ERROR!', 'error')
        })
      }
    );
  }

}
