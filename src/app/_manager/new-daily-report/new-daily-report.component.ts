import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { Customer } from 'src/app/_models/customer';
import { DailyReport, DailyReportRequest } from 'src/app/_models/daily-report';
import { CustomerService } from 'src/app/_services/customer.service';
import { DailyReportService } from 'src/app/_services/daily-report.service';

@Component({
  selector: 'app-new-daily-report',
  templateUrl: './new-daily-report.component.html',
  styleUrls: ['./new-daily-report.component.css']
})
export class NewDailyReportComponent implements OnInit {

  customers: Customer[] = [];

  request: DailyReportRequest = new DailyReportRequest;

  //form: FormGroup;

  constructor(private customerService : CustomerService, private dailyReportService : DailyReportService, private router:Router) {

    /*this.form = this.fb.group({
      customer_id: new FormControl(''),
      date: new FormControl(''),
      ost: new FormControl(''),
      ose: new FormControl(''),
      detail: new FormControl('')
    });*/


   }

  ngOnInit(): void {
    //this.form = new FormGroup({this.request});
    this.customerService.clients().subscribe(
      data =>{
        this.customers = data;
      }
    );
  }

  onSubmit(): void {
    //const { username, password } = this.form;

    //this.request = new DailyReportRequest(this.form.value);

   

    this.dailyReportService.create(this.request).subscribe(
      data => {
        this.router.navigate(['/details_report'], { queryParams: { id: data.id } });
        //this.reloadPage();
      },
      error => {
        //this.errorMessage = err.error.message;
        //this.isLoginFailed = true;
      }
    );
    /*this.authService.login(username, password).subscribe(
      data => {
        this.tokenStorage.saveToken(data.accessToken);
        this.tokenStorage.saveUser(data.username);
        this.tokenStorage.saveRoles(JSON.stringify(data.roles));
        this.tokenStorage.saveId(data.id);
        this.isLoginFailed = false;
        this.isLoggedIn = true;
        //this.roles = this.tokenStorage.getUser().roles;
        this.reloadPage();
      },
      err => {
        this.errorMessage = err.error.message;
        this.isLoginFailed = true;
      }
    );*/
  }

  reloadPage(): void {
    window.location.reload();
  }

}
