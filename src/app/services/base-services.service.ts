import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class BaseServicesService {

  private _api = `${environment.baseApi}/${this._url}`;

  constructor(private _url: string, private _http: HttpClient) {}

  getAll(): Observable<any> {
    return this._http.get(this._api);
  }

  save(data: any): Observable<any> {
    return this._http.post(this._api, data);
  }

  getByField(field: string, value: any): Observable<any> {
    return this._http.get(`${this._api}?${field}=${value}`);
  }
}
