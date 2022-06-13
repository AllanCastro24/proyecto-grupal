import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { emailValidator } from 'src/app/theme/utils/app-validators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UsersService } from 'src/app/admin/users/users.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  providers: [ UsersService ]  
})
export class ProfileComponent implements OnInit {
  public infoForm!:FormGroup; 
  constructor(public formBuilder: FormBuilder, public snackBar: MatSnackBar,public usersService:UsersService) { }
  ExisteCookie: boolean = false;
  user: String = "";
  imagen: String = "";
  correo: String = "";
  id_user: String = "";
  ngOnInit() {
    this.ExisteCookie = localStorage.getItem('ID_usuario') ? true : false;
    this.infoForm = this.formBuilder.group({
      id: null,
      name: ['', Validators.compose([Validators.required, Validators.minLength(3)])],
      email: ['', Validators.compose([Validators.required, emailValidator])],
      image: null
    }); 
    if(this.ExisteCookie){
      this.user = JSON.parse(localStorage.getItem("Usuario")as string).Usuario;
      this.imagen = JSON.parse(localStorage.getItem("image")as string).image;
      if(this.imagen == ""){
        this.imagen = "assets/images/others/user.jpg";
      };
      this.correo = JSON.parse(localStorage.getItem("Correo")as string).Correo;
      this.id_user = JSON.parse(localStorage.getItem("ID_usuario")as string).ID_usuario;
    }
  }

  public onInfoFormSubmit():void {
    if (this.infoForm.valid) { 
      console.log(this.infoForm.value)
      this.modificarUser(this.infoForm.value);
      this.snackBar.open('Se actualizó la información de la cuenta correctamente!', '×', { panelClass: 'success', verticalPosition: 'top', duration: 3000 });
    }
  } 

  public fileChange(files:any){ 
    if(files.length){
      this.infoForm.controls.image.patchValue(files[0].content); 
    } 
    else{
      this.infoForm.controls.image.patchValue(null); 
    }
  }

  public modificarUser(user:any){
    console.log("Que tiene "+ user);
    this.usersService.modificarUser(user,user.id).subscribe();
  }
}
