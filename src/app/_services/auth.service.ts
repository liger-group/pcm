import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GlobalConfig } from 'src/app/_helpers/global.config';

const API_URL = 'http://' + GlobalConfig.HOST + ':' + GlobalConfig.PORT + GlobalConfig.BASE_URL + '/auth/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<any> {
    return this.http.post(API_URL + 'signin', {
      username,
      password
    }, httpOptions);
  }

  profile(id:string): Observable<any> {
    return this.http.get(API_URL + 'profile/'+id,  httpOptions);
  }

  register(username: string, email: string, password: string): Observable<any> {
    return this.http.post(API_URL + 'signup', {
      username,
      email,
      password
    }, httpOptions);
  }
}