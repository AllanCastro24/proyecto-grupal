import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {
  public psConfig: PerfectScrollbarConfigInterface = {
    wheelPropagation:true
  };
  @ViewChild('sidenav') sidenav: any;
  public sidenavOpen:boolean = true;
  public links = [ 
    { name: 'Dashboard', href: 'dashboard', icon: 'dashboard' }, 
    { name: 'Perfil', href: 'profile', icon: 'person' },
    { name: 'Cambiar contraseña', href: 'password-change', icon: 'vpn_key' },  
    { name: 'Direcciones', href: 'addresses', icon: 'location_on' }, 
    /*{ name: 'Favoritos', href: 'favorites', icon: 'favorite' }, 
    { name: 'Reservaciones', href: 'reservations', icon: 'event' },*/
    { name: 'Ordenes', href: 'orders', icon: 'list_alt' },  
  ]; 
  constructor(public router:Router) { }
  ExisteCookie: boolean = false;
  user: String = "";
  imagen: String = "";
  ngOnInit() {
    this.ExisteCookie = localStorage.getItem('ID_usuario') ? true : false;
    if(window.innerWidth < 960){
      this.sidenavOpen = false;
    };
    if(this.ExisteCookie){
      this.user = JSON.parse(localStorage.getItem("Usuario")as string).Usuario;
      this.imagen = JSON.parse(localStorage.getItem("image")as string).image;
      if(this.imagen == ""){
        this.imagen = "assets/images/others/user.jpg";
      };
    }else{
      this.router.navigate(['/']);
    }
  }

  @HostListener('window:resize')
  public onWindowResize():void {
    (window.innerWidth < 960) ? this.sidenavOpen = false : this.sidenavOpen = true;
  }

  ngAfterViewInit(){
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {  
        if(window.innerWidth < 960){
          this.sidenav.close(); 
        }
      }                
    });
  } 

  cerrar_sesion(){
    localStorage.removeItem("ID_usuario");
    location.reload();
  }
}
