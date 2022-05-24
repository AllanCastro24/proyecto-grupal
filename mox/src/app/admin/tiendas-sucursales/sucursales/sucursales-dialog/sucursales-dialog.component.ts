import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Category, Sucursales, Tiendas } from 'src/app/app.models';
import { AppService } from 'src/app/app.service';
import { CookieService } from 'ngx-cookie-service';
@Component({
  selector: 'app-sucursales-dialog',
  templateUrl: './sucursales-dialog.component.html',
  styleUrls: ['./sucursales-dialog.component.scss']
})
export class SucursalesDialogComponent implements OnInit {

  public form!: FormGroup;
  public idtienda:any;
  public idsucursal:any;
  @Input() idtiendaaa:any = {};
  constructor(public dialogRef: MatDialogRef<SucursalesDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public Sucursales: Sucursales,
              public fb: FormBuilder,public appService:AppService,private activatedRoute: ActivatedRoute,private cookieService: CookieService) { }

  ngOnInit(): void { 
    //this.idtienda = this.activatedRoute.snapshot.paramMap.get('idtienda');
    //this.idsucursal = this.activatedRoute.snapshot.paramMap.get('idsuc');
    this.form = this.fb.group({
      ID_tienda: 0,
      Fechaalta: [null],
      ID_empleado: [null],
      ID_horario: [null],
      ID_sucursal: [null],
      //ID_horario: [null],
      //ID_tienda: [null, Validators.required],
      ID_zonasucursal: [null],
      Pseudonimo: [null, Validators.required],
      Status: [null],
      Ubicacion: [null, Validators.required],
      categoryId:[null]
    }); 

    if(this.Sucursales){
      /* this.form.patchValue({
        //id: this.form.value.id_almacen,
        name: this.tiendas.Nombre ,
        telefono: this.tiendas.Telefono,
        correo: this.tiendas.Correo
      }); */
      this.form.patchValue(this.Sucursales); 
      console.log(this.Sucursales);
    };
    
      this.idtienda = this.cookieService.get('idtienda');
      this.idsucursal = this.cookieService.get('idsucursal');
      
      console.log(this.idtienda);
      console.log(this.idsucursal);
      this.gettiendas();
      this.gethorarios();
  }
  public gettiendas(){
    if(!this.appService.Data.categories.length){
      this.appService.gettiendas().subscribe(categories=>{ 
        this.appService.Data.tiendas = categories;
      });
    } 
  }
  public gethorarios(){
    if(!this.appService.Data.categories.length){
      this.appService.gethorarios().subscribe(categories=>{ 
        this.appService.Data.horario = categories;
      });
    } 
  }
  public onSubmit(){ 
    if(this.form.valid){
      this.dialogRef.close(this.form.value);
      console.log(this.form.value);
      //this.addcategoriasmenu();

      if (this.Sucursales) {
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
    this.appService.insertarsucursal(this.form.value).subscribe (
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
    console.log(this.Sucursales.ID_sucursal);
    console.log(this.Sucursales.ID_tienda);
    //this.idtienda, this.idsucursal,this.id,this.form.value
    this.appService.editsucursal(this.Sucursales.ID_tienda,this.Sucursales.ID_tienda,this.form.value).subscribe (
      datos => {
        console.log('hola'+ datos);
        //this.ngOnInit();
      }
    )
  }

}
