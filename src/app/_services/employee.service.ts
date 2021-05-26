import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Employee } from '../_models/employee';
import { GlobalConfig } from 'src/app/_helpers/global.config';

const API_URL = 'http://' + GlobalConfig.HOST + ':' + GlobalConfig.PORT + GlobalConfig.BASE_URL + '/employee/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  constructor(private http: HttpClient) { }

  my_team(): Observable<Employee[]> {
    return this.http.get<Employee[]>(API_URL + 'my_team', httpOptions);
  }

  get_all(): Observable<Employee[]>{
    return this.http.get<Employee[]>(API_URL+"get_all", httpOptions);
  }

}