import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Category, Tiendas } from 'src/app/app.models';
import { AppService } from 'src/app/app.service';
import { CookieService } from 'ngx-cookie-service';
@Component({
  selector: 'app-tiendas-dialog',
  templateUrl: './tiendas-dialog.component.html',
  styleUrls: ['./tiendas-dialog.component.scss']
})
export class TiendasDialogComponent implements OnInit {

  public form!: FormGroup;
  public idtienda:any;
  public idsucursal:any;
  @Input() idtiendaaa:any = {};
  constructor(public dialogRef: MatDialogRef<TiendasDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public tiendas: Tiendas,
              public fb: FormBuilder,public appService:AppService,private activatedRoute: ActivatedRoute,private cookieService: CookieService) { }

  ngOnInit(): void { 
    //this.idtienda = this.activatedRoute.snapshot.paramMap.get('idtienda');
    //this.idsucursal = this.activatedRoute.snapshot.paramMap.get('idsuc');
    this.form = this.fb.group({
      ID_tienda: 0,
      Nombre: [null, Validators.required],
      Telefono: [null, Validators.required],
      Correo: [null, Validators.required],
      
    }); 

    if(this.tiendas){
      /* this.form.patchValue({
        //id: this.form.value.id_almacen,
        name: this.tiendas.Nombre ,
        telefono: this.tiendas.Telefono,
        correo: this.tiendas.Correo
      }); */
      this.form.patchValue(this.tiendas); 
      console.log(this.tiendas);
    };
    
      this.idtienda = this.cookieService.get('idtienda');
      this.idsucursal = this.cookieService.get('idsucursal');
      
      console.log(this.idtienda);
      console.log(this.idsucursal);
  }

  public onSubmit(){ 
    if(this.form.valid){
      this.dialogRef.close(this.form.value);
      console.log(this.form.value);
      //this.addcategoriasmenu();

      if (this.tiendas) {
        console.log('editar');
        this.editcategoriasmenu();
      }else{
        console.log('insertar')
        this.addcategoriasmenu();
      }
    }
    
  }
  public addcategoriasmenu(){
    console.log(this.form.value);
    //this.idtienda, this.idsucursal,this.id,this.form.value
    this.appService.insertartienda(this.form.value).subscribe (
      datos => {
        console.log('hola'+ datos);
        //this.ngOnInit();
      }
    )
    this.cookieService.delete('idtienda');
      this.cookieService.delete('idsucursal');
  }
  public editcategoriasmenu(){
    console.log(this.form.value);
    console.log(this.tiendas.ID_tienda);
    //this.idtienda, this.idsucursal,this.id,this.form.value
    this.appService.edittienda(this.tiendas.ID_tienda,this.form.value).subscribe (
      datos => {
        console.log('hola'+ datos);
        //this.ngOnInit();
      }
    )
  }

}
