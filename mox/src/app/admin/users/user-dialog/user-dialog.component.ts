import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import { User, UserProfile, UserWork, UserContacts, UserSettings } from '../user.model';

@Component({
  selector: 'app-user-dialog',
  templateUrl: './user-dialog.component.html',
  styleUrls: ['./user-dialog.component.scss']
})
export class UserDialogComponent implements OnInit {
  public form:FormGroup;
  public passwordHide:boolean = true;
  constructor(public dialogRef: MatDialogRef<UserDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public user: User,
              public fb: FormBuilder) {
    this.form = this.fb.group({
      ID_usuario: null,
      Usuario: [null, Validators.compose([Validators.required, Validators.minLength(5)])],
      pass: [null, Validators.compose([Validators.required, Validators.minLength(6)])],       
      profile: this.fb.group({
        Nombre: null,
        Apellidos: null,  
        Genero: null,
        image: null
      }),
      work: this.fb.group({
        ID_tienda: null,
        ID_tipo_pago: null,
        ID_puesto: null,
        Sueldo: null
      }),
      contacts: this.fb.group({
        Correo: null,
        Telefono: null,
        Direccion: null      
      }),
      settings: this.fb.group({
        Activo: null,
        Fecha_registro: null,
        Ultimo_ingreso: null
      })
    });
  }

  ngOnInit() {
    if(this.user){
      this.form.setValue(this.user);
    } 
    else{
      this.user = new User();
      this.user.profile = new UserProfile();
      this.user.work = new UserWork();
      this.user.contacts = new UserContacts();
      this.user.settings = new UserSettings();
    } 
  }

  close(): void {
    this.dialogRef.close();
  }

}
