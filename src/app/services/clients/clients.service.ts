import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseServicesService } from '../base-services.service';

@Injectable({
  providedIn: 'root'
})
export class ClientsService extends BaseServicesService {

  constructor(_http: HttpClient) {
    super('users', _http);
  }
}
