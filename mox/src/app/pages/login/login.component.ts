import { Component, ComponentFactoryResolver, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router'; 
import { AppSettings, Settings } from 'src/app/app.settings';
import { UsersService } from 'src/app/admin/users/users.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [ UsersService ]  
})
export class LoginComponent implements OnInit {
  public loginForm!: FormGroup;
  public hide = true;
  public bgImage:any;
  public settings: Settings;
  constructor(public fb: FormBuilder, public router:Router, private sanitizer:DomSanitizer, public appSettings:AppSettings, public usersService:UsersService) { 
    this.settings = this.appSettings.settings; 
  }

  ngOnInit(): void {
    this.bgImage = this.sanitizer.bypassSecurityTrustStyle('url(assets/images/others/login.jpg)');
    this.loginForm = this.fb.group({
      username: [null, Validators.compose([Validators.required, Validators.minLength(6)])],
      password: [null, Validators.compose([Validators.required, Validators.minLength(6)])],
      rememberMe: false
    });
  }

  public onLoginFormSubmit():void {
    if (this.loginForm.valid) {
      console.log(this.loginForm.value);
      this.login(this.loginForm.value);
      
    }
  }

  public login(user:any){
    this.usersService.login(user).subscribe(l =>{
      console.log(l);
      if(l != "Usuario o contraseña incorrecto"){
        this.router.navigate(['/']);
      }else{
        alert('Su contraseña es incorrecto');
        this.router.navigate(['/login']);
      }
    });
  }
}
