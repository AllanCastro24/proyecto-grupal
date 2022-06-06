import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { AppSettings, Settings } from '../app.settings';
import { Router, NavigationEnd } from '@angular/router'; 
import { MenuService } from './components/menu/menu.service';
import { Menu } from './components/menu/menu.model';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  @ViewChild('sidenav') sidenav:any;  
  public userImage = 'assets/images/others/admin.jpg'; 
  public settings:Settings;
  public menuItems:Array<Menu> = [];
  public toggleSearchBar:boolean = false;
  constructor(public appSettings:AppSettings, 
              public router:Router,
              private menuService: MenuService){        
    this.settings = this.appSettings.settings;
  }
  ExisteCookie:boolean = false;
  nombre:string = "";
  imagen:string = "";
  apellido:string = "";
  ngOnInit() {  
    this.ExisteCookie = localStorage.getItem('ID_usuario') ? true : false;
    if(window.innerWidth <= 960){ 
      this.settings.adminSidenavIsOpened = false;
      this.settings.adminSidenavIsPinned = false;
    };  
    this.menuItems = this.menuService.getMenuItems();    
    if(this.ExisteCookie){
      this.nombre = JSON.parse(localStorage.getItem("Nombre")as string).Nombre;
      this.imagen = JSON.parse(localStorage.getItem("image")as string).image;
      if(this.imagen == ""){
        this.imagen = "assets/images/others/user.jpg";
      };
      this.apellido = JSON.parse(localStorage.getItem("Apellidos")as string).Apellidos;
      }
    }

  ngAfterViewInit(){  
    if(document.getElementById('preloader')){
      document.getElementById('preloader')?.classList.add('hide');
    } 
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.scrollToTop();
      } 
      if(window.innerWidth <= 960){
        this.sidenav.close(); 
      }                
    });  
    this.menuService.expandActiveSubMenu(this.menuService.getMenuItems());  
  } 

  public toggleSidenav(){
    this.sidenav.toggle();
  }

  public scrollToTop(){
    var scrollDuration = 200;
    var scrollStep = -window.pageYOffset  / (scrollDuration / 20);
    var scrollInterval = setInterval(()=>{
      if(window.pageYOffset != 0){
         window.scrollBy(0, scrollStep);
      }
      else{
        clearInterval(scrollInterval); 
      }
    },10);
    if(window.innerWidth <= 768){
      setTimeout(() => {  
        window.scrollTo(0,0); 
      });
    }
  }

  @HostListener('window:resize')
  public onWindowResize():void {
    if(window.innerWidth <= 960){
      this.settings.adminSidenavIsOpened = false;
      this.settings.adminSidenavIsPinned = false; 
    }
    else{ 
      this.settings.adminSidenavIsOpened = true;
      this.settings.adminSidenavIsPinned = true;
    }
  }


}
