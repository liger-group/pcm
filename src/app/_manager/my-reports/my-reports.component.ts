import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import { DailyReport } from 'src/app/_models/daily-report';
import { DailyReportService } from 'src/app/_services/daily-report.service';
import { TokenStorageService } from 'src/app/_services/token-storage.service';

@Component({
  selector: 'app-my-reports',
  templateUrl: './my-reports.component.html',
  styleUrls: ['./my-reports.component.css']
})
export class MyReportsComponent implements OnInit {

  reports: DailyReport[] = [];

  username!: string;
  user_id!: number;

  hasErrors: boolean = false;

  isLoading: boolean = true;
  
  constructor(
    private apiService: ApiService,
    private tokenStorageService: TokenStorageService,
    private dailyReportService: DailyReportService
  ) {}

  ngOnInit() {
    this.username = this.tokenStorageService.getUser()!;
    this.user_id = +this.tokenStorageService.getId()!;
    const today = new Date();
    console.log(this.user_id);
    this.dailyReportService
      .get_all(this.user_id)
      .subscribe(
        (data) => {
          this.reports = data;
          this.isLoading = false;
          console.log('wepa');
          console.log(data);
        },
        (error) => {
          this.hasErrors = true;
          this.isLoading = false;
          console.log('falló');
        }
      );
  }

}
