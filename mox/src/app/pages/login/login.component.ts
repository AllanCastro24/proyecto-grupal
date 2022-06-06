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
    this.ExisteCookie = localStorage.getItem('usuario') ? true : false;
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
        console.log(usuario);
        localStorage.setItem("ID_usuario",JSON.stringify({'ID_usuario':usuario.ID_usuario}));
        this.usersService.buscarUser(usuario).subscribe((u:any) =>{
          if(u!="No es empleado"){
            console.log(u)
            localStorage.setItem('empleado', JSON.stringify({'IdUsuario': u.ID_empleado, 'IdSucursal': u.ID_usuario}))
            this.router.navigate(['/admin']);
          }else{
            location.reload();
            //this.router.navigate(['/']);
          }
        });
      }else{
        alert('Su contraseña es incorrecto');
        this.router.navigate(['/login']);
      }
    });
  }
}
