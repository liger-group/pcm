import { Component, OnInit } from '@angular/core';
import { Employee } from 'src/app/_models/employee';
import { EmployeeService } from '../../_services/employee.service';
import { TokenStorageService } from '../../_services/token-storage.service';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.css']
})
export class TeamComponent implements OnInit {

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
    this.employeeService.my_team().subscribe(
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
