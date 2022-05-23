import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MenuItem } from 'src/app/app.models';
import { AppService } from 'src/app/app.service'; 

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {
  private sub: any;
  public form!: FormGroup;
  public idtienda:any;
  public idsucursal:any;
  public menuItem!: any;
  constructor(public appService:AppService, private activatedRoute: ActivatedRoute, public formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({ 
      "id": null,
      "idtienda": null,
      "idsuc": null,
      "name": [null, Validators.compose([Validators.required, Validators.minLength(4)])],
      "description": null,
     /*  "price": [null, Validators.required ], 
      "image": null, 
      "discount": null, 
      "availibilityCount": null, 
      "weight": null,
      
      "categoryId": [null, Validators.required ]    */
    }); 
    this.idtienda = this.activatedRoute.snapshot.paramMap.get('idtienda');
    this.idsucursal = this.activatedRoute.snapshot.paramMap.get('idsuc');
    this.getCategories();
    this.sub = this.activatedRoute.params.subscribe(params => {  
      if(params['id']){
        this.getMenuItemById(params['id']); 
        
        //this.sub.value({menuItem: params['id']});
        //console.log(params);
      } 
      else{
        this.getMenuItemById(20); 
       // console.log(params);
      }
    }); 
  }
  public onSubmit(){
    console.log(this.form.value);
    console.log(this.idtienda);
    console.log(this.idsucursal);
      /* this.appService.insertarplatos(this.idtienda, this.idsucursal, this.form?.value).subscribe (
        datos => {
          console.log('hola'+ datos);
          //this.ngOnInit();
        }
      ) */
     // this.upload();
     this.appService.insertarcateogoriasmenu(this.idtienda,this.idsucursal,this.form.value).subscribe (
      datos => {
        console.log('hola'+ datos);
        //this.ngOnInit();
      }
    )
    
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

  public getMenuItemById(id:number){ 
    this.appService.getMenuItemById(id).subscribe(data=>{ 
      this.menuItem = data;  
      
      console.log(data);
      //this.menuItem.patchValue({data: this.menuItem.name['id']})
      //this.form.patchValue({id: menuItem[0]['id']});
     ////this.menuItem.weight = data;
      //this.menuItem.patchValue({name: this.menuItem.name['name']});
     // console.log(this.menuItem);
    }); 
  }

}
