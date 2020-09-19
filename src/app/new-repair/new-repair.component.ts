import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { RepairsService } from 'app/services/repairs/repairs.service';

@Component({
  selector: 'app-new-repair',
  templateUrl: './new-repair.component.html',
  styleUrls: ['./new-repair.component.css']
})
export class NewRepairComponent implements OnInit {

  formCar = new FormGroup({
    name: new FormControl('', [Validators.maxLength(50), Validators.required]),
    description: new FormControl('', [Validators.maxLength(400), Validators.required]),
  });

  constructor(private _repairServices: RepairsService,
    private _snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<NewRepairComponent>,
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
    this._repairServices.save({...this.formCar.value, idCar: this.data.id})
      .subscribe(res => {
        this.openSnackBar('Repair saved successfully', 'Success', 'success')
        this.dialogRef.close();
      }, error => {
        this.openSnackBar(error.error.message, 'ERROR!', 'error')
      })
  }

}
