import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DailyReport } from 'src/app/_models/daily-report';
import { DailyReportService } from 'src/app/_services/daily-report.service';


@Component({
  selector: 'app-signature',
  templateUrl: './signature.component.html',
  styleUrls: ['./signature.component.css'],
  
})
export class SignatureComponent implements OnInit {

  constructor(private router:Router, private route : ActivatedRoute, private dailyReportService:DailyReportService) { }

  request!:DailyReport;
  customer_name!:string;
  report_id!:number;
  name!:FormControl;

  ngOnInit(): void {
    this.name = new FormControl('');
    this.route.queryParams.subscribe(params => {
      this.report_id = params['id'];
      this.dailyReportService.details(this.report_id).subscribe(
        data => {
          this.request = data;
          this.customer_name = this.request.customer.name;
        },
        error => {
          //this.errorMessage = err.error.message;
          //this.isLoginFailed = true;
        }
      );
    });
  }

  sign(signature:any){
    console.log(signature);
    console.log(this.name.value);
    console.log(this.report_id);
    this.dailyReportService.sign(signature, this.name.value, this.report_id).subscribe(
      data =>{
        this.router.navigate(['/details_report'], { queryParams: { id: this.report_id } });
      },
      err =>{

      }
    )
  }

}
