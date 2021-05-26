import { Component, OnInit } from '@angular/core';
import { Employee } from 'src/app/_models/employee';
import { EmployeeService } from 'src/app/_services/employee.service';
import { TokenStorageService } from 'src/app/_services/token-storage.service';

@Component({
  selector: 'employees-list',
  templateUrl: './employees-list.component.html',
  styleUrls: ['./employees-list.component.css']
})
export class EmployeesListComponent implements OnInit {

  team: Employee[] = [];

  private categories = new Map([
    ["OFICIAL", "OFICIAL"],
    ["TECNICO", "TÉCNICO"],
    ["AYUDANTE", "AYUDANTE"],
    ["UNDEFINED", "SIN CATEGORÍA"]
  ]); 

  getCategory(s: string){
    return this.categories.get(s);
  }


  hasErrors:boolean = false;
  isLoading:boolean = true;
  constructor(private employeeService : EmployeeService, private tokenStorageService : TokenStorageService) { }

  ngOnInit(): void {
    this.employeeService.get_all().subscribe(
      data =>{
        this.team = data;
        this.isLoading = false;
      },
      error =>{
        this.hasErrors = true;
        this.isLoading = false;
        console.log('falló');
      }
    )
  }

}
