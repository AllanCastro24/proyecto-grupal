import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AppService } from 'src/app/app.service';
import { MenuItem } from 'src/app/app.models';
import { ActivatedRoute, Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-add-proveedor',
  templateUrl: './add-proveedor.component.html',
  styleUrls: ['./add-proveedor.component.scss']
})
export class AddProveedorComponent implements OnInit {
  [x: string]: any;

  public form!: FormGroup;
  private sub: any;
  public id:any;
  public showImage:boolean = false;
  public data: any;
  constructor(public appService:AppService, public formBuilder: FormBuilder, private activatedRoute: ActivatedRoute, private router: Router,
              @Inject(PLATFORM_ID) private platformId: Object) { }

  ngOnInit(): void {  
    this.form = this.formBuilder.group({ 
      "id": 0,
      "nombre_proveedor": [null, Validators.compose([Validators.required, Validators.minLength(4)])],
      "rfc_proveedor": [null, Validators.required ],
      "telefono_proveedor": [null, Validators.required ], 
      "telefono_alterno_proveedor": [null, Validators.required ], 
      "correo_proveedor": [null, Validators.required ], 
      "web": [null, Validators.required ], 
      "estatus": null,
      //"isVegetarian": false,
      "direccion_proveedor": [null, Validators.required ]   
    }); 
      //this.id = this.activeRoute.snapshot.paramMap.get('id');
      this.sub = this.activatedRoute.params.subscribe(params => {  
        if(params['id']){
          this.id = params['id'];
        } 
        else{
          this.showImage = true;
        }
      }); 
      if(this.id){ //Editar
        this.appService.GetProveedorByID(this.id).subscribe(categories=>{ 
          this.editar(categories);
         }); 
      }
    //this.id = this.activatedRoute.snapshot.paramMap.get('id');
    
  }

  editar(datos: any){
    console.log(datos[0]["direccion_proveedor"]);
   

    this.form.patchValue({
      direccion_proveedor: datos[0]["direccion_proveedor"],
      correo_proveedor: datos[0]["correo_proveedor"],
      estatus: datos[0]["estatus"],
      nombre_proveedor: datos[0]["nombre_proveedor"],
      rfc_proveedor: datos[0]["rfc_proveedor"],
      telefono_alterno_proveedor: datos[0]["telefono_alterno_proveedor"],
      telefono_proveedor: datos[0]["telefono_proveedor"],
      web: datos[0]["web"]
    });


  }
  ngOnDestroy() {
    this.sub.unsubscribe();
  } 

 
 
  public fileChange(files:any){ 
    console.log(files)
    if(files.length){
      this.form.controls.image.patchValue(files[0].content); 
    } 
    else{
      this.form.controls.image.patchValue(null); 
    }
  } 

  public onSubmit(){
    console.log(this.form.value);

    if(this.id){ //Editar
      let proveedor = {
        nombre_proveedor: this.form.value.nombre_proveedor,
        rfc_proveedor: this.form.value.rfc_proveedor,
        telefono_proveedor: this.form.value.telefono_proveedor,
        correo_proveedor: this.form.value.correo_proveedor,
        direccion_proveedor: this.form.value.direccion_proveedor,
        telefono_alterno_proveedor: this.form.value.telefono_alterno_proveedor,
        web: this.form.value.web,
        estatus: this.form.value.estatus
      }
      this.appService.ActualizarProveedor(this.id, proveedor).subscribe(categories=>{ 
       });
    }else{ //Agregar
      let proveedor = {
        nombre_proveedor: this.form.value.nombre_proveedor,
        rfc_proveedor: this.form.value.rfc_proveedor,
        telefono_proveedor: this.form.value.telefono_proveedor,
        correo_proveedor: this.form.value.correo_proveedor,
        direccion_proveedor: this.form.value.direccion_proveedor,
        telefono_alterno_proveedor: this.form.value.telefono_alterno_proveedor,
        web: this.form.value.web,
        estatus: true
      }
      this.appService.InsertarProveedor(proveedor).subscribe(categories=>{ 
      });

    }

    this.form.reset();
    this.router.navigate(['/admin/products-items/Listar-Proveedores']);
  }  


}
