import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseServicesService } from '../base-services.service';

@Injectable({
  providedIn: 'root'
})
export class CarsService extends BaseServicesService {

  constructor(_http: HttpClient) {
    super('cars', _http);
  }

  getCarsByClient(idUser: number): Observable<any> {
    return this.getByField('idUser', idUser);
  }
}
