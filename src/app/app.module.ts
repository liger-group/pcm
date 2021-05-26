import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { NavComponent } from './nav/nav.component';
import { LayoutModule } from '@angular/cdk/layout';
import { HomeComponent } from './home/home.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LOCALE_ID } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { LoginComponent } from './login/login.component';
import { TeamComponent } from './_manager/team/team.component';
import { AuthInterceptor } from './_helpers/auth.interceptor';
import { ProfileComponent } from './profile/profile.component';
import { NewDailyReportComponent } from './_manager/new-daily-report/new-daily-report.component';
import { APP_BASE_HREF } from '@angular/common';
import { DetailsDailyReportComponent } from './details-daily-report/details-daily-report.component';
import { NewEntryComponent } from './_manager/new-entry/new-entry.component';
import { SignatureComponent } from './_manager/signature/signature.component';
import {SignaturePadModule} from '@ng-plus/signature-pad';
import { MyReportsComponent } from './_manager/my-reports/my-reports.component';
import { HelpComponent } from './help/help.component';
import { ClientsCreateComponent } from './_admin/_clients/clients-create/clients-create.component';
import { ClientsListComponent } from './_admin/_clients/clients-list/clients-list.component';
import { ClientsDetailsComponent } from './_admin/_clients/clients-details/clients-details.component';
import { EmployeesListComponent } from './_admin/employees/employees-list/employees-list.component';
import { AdminHomeComponent } from './_admin/admin-home/admin-home.component';
import { EditEntryComponent } from './details-daily-report/edit/edit-entry/edit-entry.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    HomeComponent,
    LoginComponent,
    TeamComponent,
    ProfileComponent,
    NewDailyReportComponent,
    DetailsDailyReportComponent,
    NewEntryComponent,
    SignatureComponent,
    MyReportsComponent,
    HelpComponent,
    ClientsCreateComponent,
    ClientsListComponent,
    ClientsDetailsComponent,
    EmployeesListComponent,
    AdminHomeComponent,
    EditEntryComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SignaturePadModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
    }),
    LayoutModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    NgbModule
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'es-ES' },
    { provide: APP_BASE_HREF, useValue: '/' },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
