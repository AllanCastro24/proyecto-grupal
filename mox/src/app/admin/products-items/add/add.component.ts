import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AppService } from 'src/app/app.service';
import { MenuItem } from 'src/app/app.models';
import { ActivatedRoute, Router } from '@angular/router';
import { isPlatformBrowser, NgStyle } from '@angular/common';
import { emitDistinctChangesOnlyDefaultValue } from '@angular/compiler';
@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {

  public form!: FormGroup;
  private sub: any;
  public id:any;
  public showImage:boolean = false;
  public categories:any;
  public unidadMedida: any;
  public alter: any;
  public imagen: any;
  public id_insumos: any;

  constructor(public appService:AppService, 
              public formBuilder: FormBuilder, 
              private activatedRoute: ActivatedRoute, private router: Router,
              @Inject(PLATFORM_ID) private platformId: Object) { }

  ngOnInit(): void {  
    this.form = this.formBuilder.group({ 
      "id": 0,
      "codigo": [null, Validators.compose([Validators.required, Validators.minLength(4)]) ],
      "nombre": [null, Validators.compose([Validators.required, Validators.minLength(4)])],
      "id_categoria_insumos": [null, Validators.required ],
      "estatus": false,
      "producto": false,
      "id_unidad_de_medida": [null, Validators.required ], 
      "image": null, 
      "tamano": [null, Validators.required ], 
      "presentacion": [null, Validators.compose([Validators.required, Validators.minLength(4)]) ]
    }); 
    
    this.getCategories();
    this.sub = this.activatedRoute.params.subscribe(params => {  
      if(params['id']){
        this.id = params['id'];
       this.getMenuItemById(); 
      } 
      else{
        this.showImage = true;
      }
    }); 

    if(this.id){
      this.appService.GetinsumosYDetalleID(this.id).subscribe(categories=>{ 
        this.edit(categories);
      });
     
      
    }

  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  } 

  edit(datos: any){
    this.id_insumos =  datos[0]["id_insumos"];
    this.imagen = datos[0]["imagen"];
    this.form.patchValue({
      codigo: datos[0]["codigo"],
      nombre: datos[0]["nombre"],
      id_categoria_insumos: datos[0]["id_categoria_insumos"],
      estatus: datos[0]["estatus"],
      producto: datos[0]["producto"],
      id_unidad_de_medida: datos[0]["id_unidad_de_medida"],
      tamano: datos[0]["tamano"],
      presentacion: datos[0]["presentacion"]
    });
    //console.log(this.imagen)
  }



  public getCategories(){
      this.appService.GetCategoria().subscribe(categories=>{ 
        this.categories = categories;
      });
      this.appService.GetUnidad_Medida().subscribe(categories=>{ 
        this.unidadMedida = categories;
      });
    
  } 
 
  public getMenuItemById(){
    this.appService.getMenuItemById(this.id).subscribe((menuItem:MenuItem)=>{ 

      this.form.patchValue(menuItem); 
      if (isPlatformBrowser(this.platformId)) {
        this.appService.convertImgToBase64(menuItem.image.medium, (dataUrl:string) => { 
           this.showImage = true;
          this.form.controls.image.patchValue("");
        }) 
      }  
    });
  }

  imgnombre  :any;
  dataimg  :any;
  filess :any;
  archivo = {
    nombreArchivo: null as any,
    base64textString: null as any
  }
  public fileChange(files:any){ 
    console.log(files)
    if(files.length){
     this.form.controls.image.patchValue(files[0].name); 
     console.log(this.archivo.nombreArchivo= files[0].name);
     console.log(this.archivo.base64textString= files[0].content);
    } 
    else{
      this.form.controls.image.patchValue(null); 
    }
    
  }  

  public onSubmit(){
    //console.log(this.form.value);

    if(this.id){ //EDITAR

      if(this.archivo.nombreArchivo){
        let detalle_insumo = {
          tamano: this.form.value.tamano,
          imagen:  this.archivo.nombreArchivo,
          presentacion: this.form.value.presentacion,
          id_unidad_de_medida: this.form.value.id_unidad_de_medida,
        }
        this.appService.ActualizarDetalleInsumo(this.id, detalle_insumo).subscribe(datos=>{ 
        });
        this.upload();
      }else{
        let detalle_insumo = {
          tamano: this.form.value.tamano,
          imagen:  this.imagen,
          presentacion: this.form.value.presentacion,
          id_unidad_de_medida: this.form.value.id_unidad_de_medida
        }
        this.appService.ActualizarDetalleInsumo(this.id, detalle_insumo).subscribe(datos=>{ 
          
        });
      }
      console.log(this.form.value.codigo)
      let insumo = {
        codigo: this.form.value.codigo,
        nombre: this.form.value.nombre,
        id_categoria_insumos: this.form.value.id_categoria_insumos,
        estatus: this.form.value.estatus,
        producto: this.form.value.producto
      }
      
      this.appService.ActualizarInsumo(this.id_insumos, insumo).subscribe(datos=>{ 
        
      });

    }else{  //AGREGAR

      let insumo = {
        codigo: this.form.value.codigo,
        nombre: this.form.value.nombre,
        id_categoria_insumos: this.form.value.id_categoria_insumos,
        estatus: true,
        producto: this.form.value.producto
      }

      this.appService.InsertarInsumo(insumo).subscribe(categories=>{ 
        this.appService.GetLastInsumo().subscribe(datos=>{ 
          this.insertar(datos);
        });
      });
    }

    this.form.reset();
    this.router.navigate(['/admin/products-items/list']);

  }  

insertar(datos: any){
  //console.log(datos[0]["MAX( id_insumos )"]);
  
  let detalle_insumo = {
    tamano: this.form.value.tamano,
    imagen:  this.archivo.nombreArchivo,
    presentacion: this.form.value.presentacion,
    id_insumos: datos[0]["MAX( id_insumos )"],
    id_unidad_de_medida: this.form.value.id_unidad_de_medida
  }
  console.log(detalle_insumo)
  this.appService.InsertarDetalleInsumo(detalle_insumo).subscribe(datos=>{ 
    
  });

  this.upload();
}





subirarchivo(event: any){
  var files = event.target.files;
  var file = files[0];
  this.archivo.nombreArchivo = file.name;
console.log(file);
  if(files && file){
    var reader = new FileReader();
    reader.onload = this._handleReaderLoaded.bind(this);
    reader.readAsBinaryString(file);
  }
}
_handleReaderLoaded(readerEvent: any){
  var binaryString = readerEvent.target.result;
  this.archivo.base64textString = btoa(binaryString);
}

upload(){

  this.appService.subirarchivoimg(this.archivo).subscribe(
    datos =>{
      console.log(this.archivo);
      alert('Imagen Modificada');
    }
  );
}




}
