import { Component, ComponentFactoryResolver, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router'; 
import { AppSettings, Settings } from 'src/app/app.settings';
import { UsersService } from 'src/app/admin/users/users.service';
import { usuario, empleado } from 'src/app/admin/users/user.model';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [ UsersService ]
})
export class LoginComponent implements OnInit {
  public loginForm!: FormGroup;
  public hide = true;
  public user: any;//usuario[] = [];
  public empleado: empleado[] = [];
  public bgImage:any;
  public settings: Settings;
  constructor(public fb: FormBuilder, public router:Router, private sanitizer:DomSanitizer, public appSettings:AppSettings, public usersService:UsersService, private cookieService: CookieService) { 
    this.settings = this.appSettings.settings; 
  }

  ExisteCookie: boolean = false;
  ngOnInit(): void {
    this.ExisteCookie = localStorage.getItem('ID_usuario') ? true : false;
    this.bgImage = this.sanitizer.bypassSecurityTrustStyle('url(assets/images/others/login.jpg)');
    this.loginForm = this.fb.group({
      username: [null, Validators.compose([Validators.required, Validators.minLength(6)])],
      password: [null, Validators.compose([Validators.required, Validators.minLength(6)])],
      rememberMe: false
    });
    if(this.ExisteCookie){
      this.router.navigate(['/']);
    }
  }

  public onLoginFormSubmit():void {
    if (this.loginForm.valid) {
      console.log(this.loginForm.value);
      this.login(this.loginForm.value);
    }
  }

  public login(user:any){
    this.usersService.login(user).subscribe((usuario:any) =>{
      if(usuario!="Usuario o contraseña incorrecto"){
        //console.log(usuario);
        localStorage.setItem("ID_usuario",JSON.stringify({'ID_usuario':usuario.ID_usuario}));
        localStorage.setItem("Correo",JSON.stringify({'Correo':usuario.Correo}));
        localStorage.setItem("Usuario",JSON.stringify({'Usuario':usuario.Usuario}));
        localStorage.setItem("image",JSON.stringify({'image':usuario.image}));
        localStorage.setItem("pass",JSON.stringify({'pass':usuario.pass}));
        this.usersService.buscarUser(usuario).subscribe((u:any) =>{
          if(u!="No es empleado"){
            console.log(u)
            localStorage.setItem("Apellidos",JSON.stringify({'Apellidos':u.Apellidos}));
            localStorage.setItem("Direccion",JSON.stringify({'Direccion':u.Direccion}));
            localStorage.setItem("Genero",JSON.stringify({'Genero':u.Genero}));
            localStorage.setItem("ID_puesto",JSON.stringify({'ID_puesto':u.ID_puesto}));
            localStorage.setItem("ID_sucursal",JSON.stringify({'ID_sucursal':u.ID_sucursal}));
            localStorage.setItem("ID_tienda",JSON.stringify({'ID_tienda':u.ID_tienda}));
            localStorage.setItem("ID_tipo_pago: 0",JSON.stringify({'ID_tipo_pago: 0':u.ID_tipo_pago}));
            localStorage.setItem("Nombre",JSON.stringify({'Nombre':u.Nombre}));
            localStorage.setItem("Sueldo",JSON.stringify({'Sueldo':u.Sueldo}));
            localStorage.setItem("Telefono",JSON.stringify({'Telefono':u.Telefono}));
            this.router.navigate(['/admin']);
          }else{
            location.reload();
          }
        });
      }else{
        alert('Su contraseña es incorrecto');
        this.router.navigate(['/login']);
      }
    });
  }
}
