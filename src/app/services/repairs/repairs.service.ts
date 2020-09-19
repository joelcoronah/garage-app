import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseServicesService } from '../base-services.service';

@Injectable({
  providedIn: 'root'
})
export class RepairsService extends BaseServicesService {

  constructor(_http: HttpClient) {
    super('repairs', _http);
  }

  getRepairsByCar(idCar: number): Observable<any> {
    return this.getByField('idCar', idCar);
  }
}
