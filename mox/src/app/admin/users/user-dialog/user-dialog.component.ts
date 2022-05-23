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
      ID_empleado: this.user.ID_empleado,
      Nombre: this.user.Nombre,
      Apellidos: this.user.Apellidos,  
      Genero: this.user.Genero,
      ID_tienda: this.user.ID_tienda,
      ID_tipo_pago: this.user.ID_tipo_pago,
      ID_puesto: this.user.ID_puesto,
      Sueldo: this.user.Sueldo,
      Telefono: this.user.Telefono,
      Direccion: this.user.Direccion,    
      Fecha_registro: this.user.Fecha_registro,
      Ultimo_ingreso: this.user.Ultimo_ingreso,
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
