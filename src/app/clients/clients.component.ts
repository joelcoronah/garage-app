import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { IClient } from 'app/interfaces/client.interface';
import { NewClientComponent } from 'app/new-client/new-client.component';
import { ClientsService } from 'app/services/clients/clients.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent implements OnInit {

  clients: IClient[] = [];
  dialogRef: any;

  constructor(private _clientServices: ClientsService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.getClients();
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
    this._clientServices.getAll()
      .subscribe((data: IClient[]) => {
        console.log(data)
        this.clients = data;
      }, error => {
        console.log(error);
      })
  }

}
