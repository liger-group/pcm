import { WorkEntry, WorkEntryRequest } from './../_models/work-entry';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DailyReportRequest } from '../_models/daily-report';
import { WorkEntryRequestArray } from '../_models/work-entry';
import { GlobalConfig } from 'src/app/_helpers/global.config';

const API_URL = 'http://' + GlobalConfig.HOST + ':' + GlobalConfig.PORT + GlobalConfig.BASE_URL + '/daily_report/';


const my_reports_params = new HttpParams()
      .set('page', "0")
      .set('size', "10"); //test

@Injectable({
  providedIn: 'root'
})
export class DailyReportService {
  constructor(private http: HttpClient) { }

  create(report:DailyReportRequest) : Observable<any>{
    return this.http.post<any>(API_URL+"create",report);
  }

  details(id:number) : Observable<any>{
    return this.http.get<any>(API_URL+"details/"+id);
  }
  
  my_reports(id:number, day:number, month:number, year:number) : Observable<any>{
      return this.http.post<any>(API_URL+"my_reports/", {id : id, day: day, month: month, year:year},{params:my_reports_params});
  }

  get_reports_by_date( day:number, month:number, year:number) : Observable<any>{
    return this.http.post<any>(API_URL+"my_reports/", {id : null, day: day, month: month, year:year},{params:my_reports_params});
  } 

  get_all(id:number) : Observable<any>{
    return this.http.get<any>(API_URL+"get_all/"+id);
  }

  addEntries(entries:WorkEntryRequestArray) : Observable<any>{
    return this.http.post<any>(API_URL+"addEntries", entries);
  }

  sign(signature:string, name:string, daily_report_id:number): Observable<any>{
    return this.http.post<any>(API_URL+"sign", {signature: signature, name : name, daily_report_id : daily_report_id});
  }

  updateEntry(daily_report_id:number, workEntry: WorkEntryRequest) : Observable<any> {
    return this.http.post<any>(API_URL+"update_entry/" + daily_report_id, workEntry);
  }

  deleteEntry(entry_id:number) : Observable<any> {
    return this.http.delete<any>(API_URL+"delete_entry/" + entry_id);
  }

}
