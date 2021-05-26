import { AdminHomeComponent } from './_admin/admin-home/admin-home.component';
import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { TeamComponent } from './_manager/team/team.component';
import { ProfileComponent } from './profile/profile.component';
import { NewDailyReportComponent } from './_manager/new-daily-report/new-daily-report.component';
import { NavComponent } from './nav/nav.component';
import { DetailsDailyReportComponent } from './details-daily-report/details-daily-report.component';
import { NewEntryComponent } from './_manager/new-entry/new-entry.component';
import { SignatureComponent } from './_manager/signature/signature.component';
import { MyReportsComponent } from './_manager/my-reports/my-reports.component';
import { EmployeesListComponent } from './_admin/employees/employees-list/employees-list.component';
import { ClientsListComponent } from './_admin/_clients/clients-list/clients-list.component';

const routes: Routes = [
  { path:'', component:NavComponent, children: [
      {path: '', component: HomeComponent },
      {path: 'admin-home', component: AdminHomeComponent },
      {path: 'new_report', component: NewDailyReportComponent  },
      {path: 'details_report', component: DetailsDailyReportComponent },
      {path: 'sign', component: SignatureComponent },
      {path: 'my_reports', component: MyReportsComponent },
      {path: 'new_entry', component: NewEntryComponent },
      {path: 'profile', component: ProfileComponent },
      {path: 'team', component: TeamComponent  },
      {path: 'employees-list', component: EmployeesListComponent  },
      {path: 'clients-list', component: ClientsListComponent  }
    ] 
 },
  { path: 'login', component: LoginComponent }
  //{ path: 'new_report', component: NewDailyReportComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
