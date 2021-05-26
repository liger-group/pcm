import { Component, OnInit } from '@angular/core';
import { FormGroup, FormArray, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Employee } from 'src/app/_models/employee';
import { WorkEntryRequestArray } from 'src/app/_models/work-entry';
import { DailyReportService } from 'src/app/_services/daily-report.service';
import { EmployeeService } from 'src/app/_services/employee.service';
import { TokenStorageService } from 'src/app/_services/token-storage.service';


@Component({
  selector: 'app-new-entry',
  templateUrl: './new-entry.component.html',
  styleUrls: ['./new-entry.component.css']
})
export class NewEntryComponent {

  productForm: FormGroup;

  team: Employee[] = [];

  request!: WorkEntryRequestArray;

  report_id!:number;
   
  constructor(private router:Router, private route:ActivatedRoute, private fb:FormBuilder, private employeeService:EmployeeService, private dailyReportService:DailyReportService, private tokenService:TokenStorageService) {
   
    this.productForm = this.fb.group({
      entries: this.fb.array([]) ,
    });
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.report_id = params['id']; 
    });

    this.employeeService.my_team().subscribe(
      data =>{
        this.team = data;
        //this.isLoading = false;
      },
      error =>{
        //this.hasErrors = true;
        //this.isLoading = false;
        console.log('falló');
      }
    )
  }
  
  quantities() : FormArray {
    return this.productForm.get("entries") as FormArray
  }
   
  newQuantity(): FormGroup {
    return this.fb.group({
      employee_id: new FormControl(this.team[0].id,[Validators.required]),
      hours: new FormControl(0, [Validators.required]),
      factor: new FormControl(100 , [Validators.required]),
      night: false,
      height: false,
      description: ""
    })
  }
   
  addQuantity() {
    this.quantities().push(this.newQuantity());
  }
   
  removeQuantity(i:number) {
    this.quantities().removeAt(i);
  }

  getEntries(i:number):FormGroup{
    const array= this.productForm.get("entries") as FormArray;
    return array.at(i) as FormGroup;
  }
   
  onSubmit() {
    if(!this.productForm.valid)
      return;
    this.request = new WorkEntryRequestArray(this.productForm.value);
    //this.request.daily_report_id = 
    this.request.daily_report_id= this.report_id as number;

    console.log(JSON.stringify(this.request));

    this.dailyReportService.addEntries(this.request).subscribe(
      data =>{
        this.router.navigate(['/details_report'], { queryParams: { id: this.report_id } });
      }
    )
  }
  
}
