import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor() { }
  ExisteCookie:boolean = false;
  nombre:string = "";
  imagen:string = "";
  apellido:string = "";
  correo:string = "";
  ngOnInit(): void {
    this.ExisteCookie = localStorage.getItem('ID_usuario') ? true : false;
    if(this.ExisteCookie){
      this.nombre = JSON.parse(localStorage.getItem("Nombre")as string).Nombre;
      this.imagen = JSON.parse(localStorage.getItem("image")as string).image;
      if(this.imagen == ""){
        this.imagen = "assets/images/others/user.jpg";
      };
      this.apellido = JSON.parse(localStorage.getItem("Apellidos")as string).Apellidos;
      this.correo = JSON.parse(localStorage.getItem("Correo")as string).Correo;
      }
  }

}
