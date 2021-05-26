import { AppComponent } from './../app.component';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

import { ApiService } from '../api.service';
import { Item } from '../api.service';
import { TokenStorageService } from '../_services/token-storage.service';
import { DailyReportService } from '../_services/daily-report.service';
import { DailyReport } from '../_models/daily-report';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  panelOpenState = false;

  date: Date = new Date();
  day: number = this.date.getDate();
  monthNames = [
    'Enero',
    'Febrero',
    'Marzo',
    'Abril',
    'Mayo',
    'Junio',
    'Julio',
    'Agosto',
    'Septiembre',
    'Octubre',
    'Noviembre',
    'Diciembre',
  ];
  month: string = this.monthNames[this.date.getMonth()];
  year: number = this.date.getFullYear();

  range: FormGroup = new FormGroup({
    start: new FormControl(),
    end: new FormControl(),
  });

  title = 'rm-app';
  items: Array<Item> = [];

  reports: DailyReport[] = [];

  username!: string;

  hasErrors: boolean = false;

  isLoading: boolean = true;

  hasRoleManager : boolean = false;

  hasRoleAdmin : boolean = false;

  newReport() {
    window.location.href = '/new_report';
  }

  constructor(
    private apiService: ApiService,
    private tokenStorageService: TokenStorageService,
    private dailyReportService: DailyReportService
  ) {
    this.hasRoleManager = tokenStorageService.hasRole("ROLE_MANAGER");
    this.hasRoleAdmin = tokenStorageService.hasRole("ROLE_ADMIN"); 
  }
  ngOnInit() {
    
    this.username = this.tokenStorageService.getUser()!;

    const today = new Date();

    if(this.hasRoleManager){
      this.dailyReportService
        .my_reports(1, today.getDate(), today.getMonth(), today.getFullYear())
        .subscribe(
          (data) => {
            this.reports = data.content;
            this.isLoading = false;
          },
          (error) => {
            this.hasErrors = true;
            this.isLoading = false;
            console.log('falló');
          }
        );
    }
    else{
      this.dailyReportService
      .get_reports_by_date(today.getDate(), today.getMonth(), today.getFullYear())
      .subscribe(
        (data) => {
          this.reports = data.content;
          this.isLoading = false;
        },
        (error) => {
          this.hasErrors = true;
          this.isLoading = false;
          console.log('falló');
        }
      );
    }
  }
}
