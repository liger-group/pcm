import { Component, OnInit } from '@angular/core';

@Component({
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css']
})
export class AdminHomeComponent implements OnInit {

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

  username!: string;


  constructor() { }

  ngOnInit(): void {
  }

}
