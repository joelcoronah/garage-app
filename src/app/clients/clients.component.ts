import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { IClient } from 'app/interfaces/client.interface';
import { NewClientComponent } from 'app/new-client/new-client.component';
import { ClientsService } from 'app/services/clients/clients.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { SpinnerService } from 'app/services/spinner.services';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent implements OnInit {

  clients: IClient[] = [];
  dialogRef: any;
  showSpinner = false;

  constructor(private _clientServices: ClientsService,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar,
    private spinnerService: SpinnerService,
  ) { }

  ngOnInit(): void {
    this.getClients();
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
      this.getClients();
    });
  }

  getClients(): void {
    this.showSpinner = true
    this._clientServices.getAll()
      .subscribe((data: IClient[]) => {
        this.clients = data;
        this.openSnackBar('Client listed successfully', 'Success', 'success')
        setTimeout(() => {
          this.showSpinner = false
        }, 1000);
      }, error => {
        this.openSnackBar('Can\'t list clients', 'ERROR!', 'error')
        setTimeout(() => {
          this.showSpinner = false
        }, 1000);
      })
  }
}
