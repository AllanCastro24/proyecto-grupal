import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import { Router } from '@angular/router'; 
import { MatSnackBar } from '@angular/material/snack-bar';
import { matchingPasswords, emailValidator } from 'src/app/theme/utils/app-validators';
import { DomSanitizer } from '@angular/platform-browser';
import { usuario } from 'src/app/admin/users/user.model';
import { UsersService } from 'src/app/admin/users/users.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  providers: [ UsersService ]  
})
export class RegisterComponent implements OnInit {
  public registerForm!: FormGroup;
  public usuarios: usuario[] = [];
  public hide = true; 
  public bgImage:any;
  constructor(public fb: FormBuilder, public router:Router, public snackBar: MatSnackBar, private sanitizer:DomSanitizer,public usersService:UsersService) { }

  ngOnInit() {
    this.bgImage = this.sanitizer.bypassSecurityTrustStyle('url(assets/images/others/register.jpg)');
    this.registerForm = this.fb.group({ 
      username: ['', Validators.compose([Validators.required, Validators.minLength(6)])],
      email: ['', Validators.compose([Validators.required, emailValidator])],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]                           
    },{validator: matchingPasswords('password', 'confirmPassword')});
  }

  public onRegisterFormSubmit():void {
    if (this.registerForm.valid) {
      //Llamada a la api
      this.agregarEmpleado(this.registerForm.value);
      this.snackBar.open('Registrado con éxito!', '×', { panelClass: 'success', verticalPosition: 'top', duration: 3000 });
    }
  }

  public agregarEmpleado(user:any){
    console.log(user);
    this.usersService.agregarUser(user).subscribe();
}
}
