import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import { User, usuario, puesto, tienda, sucursal } from '../user.model';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-user-dialog',
  templateUrl: './user-dialog.component.html',
  styleUrls: ['./user-dialog.component.scss'],
  providers: [ UsersService ]
})
export class UserDialogComponent implements OnInit {
  public form:FormGroup;
  public usuarios: usuario[] = [];
  public puestos: puesto[] = [];
  public tiendas: tienda[] = [];
  public sucursales: sucursal[] = [];
  public passwordHide:boolean = true;
  constructor(public dialogRef: MatDialogRef<UserDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public user: User,
              public fb: FormBuilder, public usersService:UsersService) {
                if(user){
                  this.form = this.fb.group({
                    ID_empleado: this.user.ID_empleado,
                    Nombre: this.user.Nombre,
                    Apellidos: this.user.Apellidos,  
                    Genero: this.user.Genero,
                    ID_tienda: this.user.ID_tienda,
                    ID_tipo_pago: this.user.ID_tipo_pago,
                    ID_puesto: this.user.ID_puesto,
                    ID_sucursal: this.user.ID_sucursal,
                    Sueldo: this.user.Sueldo,
                    Telefono: this.user.Telefono,
                    Direccion: this.user.Direccion,    
                    Fecha_registro: this.user.Fecha_registro,
                    Ultimo_ingreso: this.user.Ultimo_ingreso,
                  });
                }else{
                  this.form = this.fb.group({
                    ID_empleado: null,
                    Nombre: null,
                    Apellidos: null,  
                    Genero: null,
                    ID_tienda: null,
                    ID_tipo_pago: null,
                    ID_puesto: null,
                    ID_sucursal: null,
                    Sueldo: null,
                    Telefono: null,
                    Direccion: null,    
                    Fecha_registro: null,
                    Ultimo_ingreso: null,
                  });
                }
  }

  ngOnInit() {
    this.usersService.getPuesto().subscribe(puesto => {this.puestos=puesto;});
    this.usersService.getTienda().subscribe(tienda => {this.tiendas=tienda;});
    this.usersService.getSucursal().subscribe(sucursal => {this.sucursales=sucursal;});
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
