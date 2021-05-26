import { Component, OnInit } from '@angular/core';
import { Customer } from 'src/app/_models/customer';
import { Employee } from 'src/app/_models/employee';
import { CustomerService } from 'src/app/_services/customer.service';
import { TokenStorageService } from 'src/app/_services/token-storage.service';

@Component({
  selector: 'app-clients-list',
  templateUrl: './clients-list.component.html',
  styleUrls: ['./clients-list.component.css']
})
export class ClientsListComponent implements OnInit {

  clients: Customer[] = [];

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
  constructor(private customerService : CustomerService, private tokenStorageService : TokenStorageService) { }

  ngOnInit(): void {
    this.customerService.clients().subscribe(
      data =>{
        this.clients = data;
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
