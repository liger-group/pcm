import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Customer } from '../_models/customer';
import { GlobalConfig } from 'src/app/_helpers/global.config';

const API_URL = 'http://' + GlobalConfig.HOST + ':' + GlobalConfig.PORT + GlobalConfig.BASE_URL + '/customer/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  constructor(private http: HttpClient) { }

  clients(): Observable<Customer[]> {
    return this.http.get<Customer[]>(API_URL + 'all', httpOptions);
  }

}