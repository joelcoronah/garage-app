import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ClientsService } from 'app/services/clients/clients.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialogRef } from '@angular/material/dialog';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-new-client',
  templateUrl: './new-client.component.html',
  styleUrls: ['./new-client.component.css']
})
export class NewClientComponent implements OnInit {

  formClient = new FormGroup({
    firstName: new FormControl('', [Validators.maxLength(50), Validators.required]),
    lastName: new FormControl('', [Validators.maxLength(50), Validators.required]),
    identityDocument: new FormControl('', [Validators.maxLength(50), Validators.required]),
    mail: new FormControl('', [Validators.email, Validators.required]),
    telephone: new FormControl('', [Validators.maxLength(50)]),
    address: new FormControl('', [Validators.minLength(10)]),
  });

  constructor(private _clientService: ClientsService,
    private _snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<NewClientComponent>) { }

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

  createClient() {
    this._clientService.save(this.formClient.value)
      .subscribe(res => {
        this.openSnackBar('Client saved successfully', 'Success', 'success')
        this.dialogRef.close();
      }, error => {
        this.openSnackBar(error.error.message, 'ERROR!', 'error')
      })
  }

}
