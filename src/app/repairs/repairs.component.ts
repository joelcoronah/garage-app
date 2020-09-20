import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { IRepair } from 'app/interfaces/repair.interface';
import { NewRepairComponent } from 'app/new-repair/new-repair.component';
import { RepairsService } from 'app/services/repairs/repairs.service';

@Component({
  selector: 'app-repairs',
  templateUrl: './repairs.component.html',
  styleUrls: ['./repairs.component.css']
})
export class RepairsComponent implements OnInit {

  repairs: IRepair[] = [];
  dialogRef: any;
  idCar: number;
  showSpinner = false;

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
    this.showSpinner = true;

    this._repairServices.getAll()
      .subscribe((data: IRepair[]) => {
        this.repairs = data;
        this.openSnackBar('Repairs listed successfully', 'Success', 'success')
        setTimeout(() => {
          this.showSpinner = false
        }, 1000);
      }, error => {
        this.openSnackBar('Can\'t list Repairs', 'ERROR!', 'error')
        setTimeout(() => {
          this.showSpinner = false
        }, 1000);
      })
  }

}
