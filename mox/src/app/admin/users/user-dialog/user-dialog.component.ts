import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import { User } from '../user.model';

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
      Nombre: null,
      Apellidos: null,  
      Genero: null,
      image: null,
      ID_tienda: null,
      ID_tipo_pago: null,
      ID_puesto: null,
      Sueldo: null,
      Correo: null,
      Telefono: null,
      Direccion: null,    
      Activo: null,
      Fecha_registro: null,
      Ultimo_ingreso: null
    });
  }

  ngOnInit() {
    if(this.user){
      this.form.setValue(this.user);
    } 
    else{
      this.user = new User();
    } 
  }

  close(): void {
    this.dialogRef.close();
  }

}
