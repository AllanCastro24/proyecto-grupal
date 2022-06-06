import { Component, OnInit } from '@angular/core';
import { asString } from 'html2canvas/dist/types/css/types/color';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-user-menu',
  templateUrl: './user-menu.component.html',
  styleUrls: ['./user-menu.component.scss']
})
export class UserMenuComponent implements OnInit {

  constructor(public appService:AppService) { }
  ExisteCookie: boolean = false;
  user: String = "";
  imagen: String = "";
  correo: String = "";
  ngOnInit() {
    this.ExisteCookie = localStorage.getItem('ID_usuario') ? true : false;
    console.log(this.ExisteCookie);

    if(this.ExisteCookie){
      this.user = JSON.parse(localStorage.getItem("Usuario")as string).Usuario;
      this.imagen = JSON.parse(localStorage.getItem("image")as string).image;
      if(this.imagen == ""){
        this.imagen = "assets/images/others/user.jpg";
      };
      this.correo = JSON.parse(localStorage.getItem("Correo")as string).Correo;
    }
  }

  cerrar_sesion(){
    localStorage.removeItem("ID_usuario");
    location.reload();
  }
}
