import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { matchingPasswords } from 'src/app/theme/utils/app-validators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UsersService } from 'src/app/admin/users/users.service';

@Component({
  selector: 'app-password-change',
  templateUrl: './password-change.component.html',
  styleUrls: ['./password-change.component.scss'],
  providers: [ UsersService ]  
})
export class PasswordChangeComponent implements OnInit {
  public passwordForm!:FormGroup;
  public hide = true; 
  constructor(public formBuilder: FormBuilder, public snackBar: MatSnackBar,public usersService:UsersService) { }

  ngOnInit(): void {
    this.passwordForm = this.formBuilder.group({
      id: null,
      currentPassword: ['', Validators.required],
      newPassword: ['', Validators.required],
      confirmNewPassword: ['', Validators.required]
    },{validator: matchingPasswords('newPassword', 'confirmNewPassword')});
  }

  public onPasswordFormSubmit():void {
    if (this.passwordForm.valid) {
      console.log(this.passwordForm.value)
      this.cambiar_pass(this.passwordForm.value);
      this.snackBar.open('La contraseña se actualizó con éxito!', '×', { panelClass: 'success', verticalPosition: 'top', duration: 3000 });
    }
  }

  public cambiar_pass(user:any){
    this.usersService.modificarPass(user,user.id).subscribe(l =>{});
  }
}
