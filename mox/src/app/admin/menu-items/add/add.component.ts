import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AppService } from 'src/app/app.service';
import { MenuItem } from 'src/app/app.models';
import { ActivatedRoute } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {
  public form!: FormGroup;
  private sub: any;
  public id:any;
  public idtienda:any;
  public idsucursal:any;
  public showImage:boolean = false;

  constructor(public appService:AppService, 
              public formBuilder: FormBuilder, 
              private activatedRoute: ActivatedRoute,
              @Inject(PLATFORM_ID) private platformId: Object) { }

  ngOnInit(): void {  
    this.form = this.formBuilder.group({ 
      "id": null,
      "idtienda": null,
      "idsuc": null,
      "name": [null, Validators.compose([Validators.required, Validators.minLength(4)])],
      "description": null,
      "price": [null, Validators.required ], 
      "image": null, 
      "discount": null, 
      "availibilityCount": null, 
      "weight": null,
      "ingrediente1": null,
      "weight1": null,
      "peso1": null,
      "ingrediente2": null,
      "weight2": null,
      "peso2": null,
      "ingrediente3": null,
      "weight3": null,
      "peso3": null,
      "ingrediente4": null,
      "weight4": null,
      "peso4": null,
      "ingrediente5": null,
      "weight5": null,
      "peso5": null,
      "ingrediente6": null,
      "weight6": null,
      "peso6": null,
      "ingrediente7": null,
      "weight7": null,
      "peso7": null,
      "ingrediente8": null,
      "weight8": null,
      "peso8": null,
      "ingrediente9": null,
      "weight9": null,
      "peso9": null,
      "ingrediente10": null,
      "weight10": null,
      "peso10": null,
      "ingrediente11": null,
      "weight11": null,
      "peso11": null,
      "ingrediente12": null,
      "weight12": null,
      "peso12": null,
      "isVegetarian": false,
      "categoryId": [null, Validators.required ]   
    }); 
    this.getCategories();
    this.getUnidadespla();
    this.sub = this.activatedRoute.params.subscribe(params => {  
      if(params['id']){
        this.id = params['id'];
        
        this.getMenuItemById(); 
      } 
      else{
        this.showImage = true;
      }
    }); 
    this.idtienda = this.activatedRoute.snapshot.paramMap.get('idtienda');
    this.idsucursal = this.activatedRoute.snapshot.paramMap.get('idsuc');
    /* this.activatedRoute.params.subscribe(params => {  
      this.onSubmit(params['idtienda'],params['idsucursal']); 
     // this.id = this.getMenuItems(params['id']); 
    });  */
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  } 

  public getCategories(){
    if(!this.appService.Data.categories.length){
      this.appService.getCategories().subscribe(categories=>{ 
        this.appService.Data.categories = categories;
      });
    } 
  } 

  public getUnidadespla(){
    if(!this.appService.Data.unidades.length){
      this.appService.getUnidadespla().subscribe(unidades=>{ 
        this.appService.Data.unidades = unidades;
      });
    } 
  } 
 
  public getMenuItemById(){
    this.appService.getMenuItemById(this.id).subscribe((menuItem:any)=>{ 
      this.form.patchValue({id: menuItem[0]['id']});
      this.form.patchValue({name: menuItem[0]['name']});
      
      this.form.patchValue({price: menuItem[0]['price']});
      this.form.patchValue({description: menuItem[0]['description']}); 
      this.form.patchValue({availibilityCount: menuItem[0]['availibilityCount']}); 
      this.form.patchValue({weight: menuItem[0]['weight']});
      this.form.patchValue({categoryId: menuItem[0]['categoryId']});
      this.form.patchValue({image: menuItem[0]['image']});
      
      this.form.patchValue({ingrediente1: menuItem[0]['ingrediente1']});  
      this.form.patchValue({weight1: menuItem[0]['weight1']});  
      this.form.patchValue({peso1: menuItem[0]['peso1']});  
      //console.log(menuItem[0]['image']);
      console.log({categoryId: menuItem[0]['categoryId']});
      console.log({ingrediente1: menuItem[0]['ingrediente1']});
      this.showImage = true;
      //this.form.controls.image.patchValue({image: menuItem[0]['image']});
       /* if (isPlatformBrowser(this.platformId)) {
        this.appService.convertImgToBase64(menuItem.image, (dataUrl:string) => { 
          this.showImage = true;
          this.form.controls.image.patchValue(dataUrl.toString());
        }) 
      }   */
    });
  }

  imgnombre  :any;
  dataimg  :any;
  filess :any;
  public fileChange(files:any){ 
    console.log(files)
    if(files.length){
     this.form.controls.image.patchValue(files[0].name); 
     //console.log( this.form.controls.image.patchValue(files[0].name));
     //this.archivo.base64textString =( this.form.controls.image.patchValue(files[0].content));
     console.log(this.archivo.nombreArchivo= files[0].name);
     console.log(this.archivo.base64textString= files[0].content);
    } 
    else{
      this.form.controls.image.patchValue(null); 
    }
    
  } 
  
  archivo = {
    //nombre: null,
    nombreArchivo: null as any,
    base64textString: null as any,
    //descripcion2: null as any,
    //precio2: null as any,
    //idproducto2: null as any,
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
  

  public onSubmit(){
    console.log(this.form.value);
    console.log(this.idtienda);
    console.log(this.idsucursal);
      this.appService.insertarplatos(this.idtienda, this.idsucursal, this.form?.value).subscribe (
        datos => {
          console.log('hola'+ datos);
          //this.ngOnInit();
        }
      )
      this.upload();
    
  }  

  public updatedatos(){
    console.log(this.form.value);
    this.appService.update(this.idtienda, this.idsucursal,this.id,this.form.value).subscribe (
      datos => {
        console.log('hola'+ datos);
        //this.ngOnInit();
      }
    )
  }
  
  public bajaplato(){
    console.log(this.form.value);
    this.appService.bajaplato(this.idtienda, this.idsucursal,this.id,this.form.value).subscribe (
      datos => {
        console.log('hola'+ datos);
        //this.ngOnInit();
      }
    )
  }

  

} 