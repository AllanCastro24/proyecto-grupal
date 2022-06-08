import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-menu',
  templateUrl: './user-menu.component.html',
  styleUrls: ['./user-menu.component.scss']
})
export class UserMenuComponent implements OnInit {
  public userImage = 'assets/images/others/admin.jpg';
  constructor(public router:Router) { }
  ExisteCookie:boolean = false;
  nombre:string = "";
  imagen:string = "";
  apellido:string = "";
  ngOnInit(): void {
    this.ExisteCookie = localStorage.getItem('ID_usuario') ? true : false;
    if(this.ExisteCookie){
      this.nombre = JSON.parse(localStorage.getItem("Nombre")as string).Nombre;
      this.imagen = JSON.parse(localStorage.getItem("image")as string).image;
      if(this.imagen == ""){
        this.imagen = "assets/images/others/user.jpg";
      };
      this.apellido = JSON.parse(localStorage.getItem("Apellidos")as string).Apellidos;
    }
    else{
      this.router.navigate(['/']);
    }
  }

  cerrar_sesion(){
    localStorage.removeItem("ID_usuario");
    location.reload();
  }

}
