import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AppService } from 'src/app/app.service';
import { MenuItem } from 'src/app/app.models';
import { ActivatedRoute } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
@Component({
  selector: 'app-reports-sales',
  templateUrl: './reports-sales.component.html',
  styleUrls: ['./reports-sales.component.scss']
})
export class ReportsSalesComponent implements OnInit {
  public form!: FormGroup;
  private sub: any;
  public hours = ['1:00am', '2:00am', '3:00am', '4:00am', '5:00am', '6:00am', '7:00am', '8:00am', '9:00am', '10:00am', '11:00am', '12:00am',
    '1:00pm', '2:00pm', '3:00pm', '4:00pm', '5:00pm', '6:00pm', '7:00pm', '8:00pm', '9:00pm', '10:00pm', '11:00pm', '12:00pm'];
  public today = new Date();
  

  constructor(public appService:AppService, 
    public formBuilder: FormBuilder, 
    private activatedRoute: ActivatedRoute,
    @Inject(PLATFORM_ID) private platformId: Object) { }

  ngOnInit(): void {  
    this.form = this.formBuilder.group({ 
      // "id": 0,
      // "name": [null, Validators.compose([Validators.required, Validators.minLength(4)])],
      // "description": null,
      "buscarPor": [null, Validators.required ], 
      "fecha": null,
      "fecha2" : null,
      "dia":null,
      
    }); 
    // this.getCategories();
    // this.sub = this.activatedRoute.params.subscribe(params => {  
    //   if(params['id']){
    //     this.id = params['id'];
    //     this.getMenuItemById(); 
    //   } 
    //   else{
    //     this.showImage = true;
    //   }
    // }); 
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




  public onSubmit(){
    console.log(this.form.value);
  }  
 
}
