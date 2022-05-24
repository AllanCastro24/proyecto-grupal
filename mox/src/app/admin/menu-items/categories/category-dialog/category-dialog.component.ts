import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Category } from 'src/app/app.models';
import { AppService } from 'src/app/app.service';
import { CookieService } from 'ngx-cookie-service';
@Component({
  selector: 'app-category-dialog',
  templateUrl: './category-dialog.component.html',
  styleUrls: ['./category-dialog.component.scss']
})
export class CategoryDialogComponent implements OnInit {
  public form!: FormGroup;
  public idtienda:any;
  public idsucursal:any;
  @Input() idtiendaaa:any = {};
  constructor(public dialogRef: MatDialogRef<CategoryDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public category: Category,
              public fb: FormBuilder,public appService:AppService,private activatedRoute: ActivatedRoute,private cookieService: CookieService) { }

  ngOnInit(): void { 
    //this.idtienda = this.activatedRoute.snapshot.paramMap.get('idtienda');
    //this.idsucursal = this.activatedRoute.snapshot.paramMap.get('idsuc');
    this.form = this.fb.group({
      id: 0,
      name: [null, Validators.required],
      description: null,
      estatus:null,
      idtienda:null,
      idsucursal:null, 
    }); 

    if(this.category){
      this.form.patchValue(this.category); 
      console.log(this.category);
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

      if (this.category) {
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
    this.appService.insertarcateogoriasmenu(this.idtienda,this.idsucursal,this.form.value).subscribe (
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
    console.log(this.category.id);
    //this.idtienda, this.idsucursal,this.id,this.form.value
    this.appService.editcateogoriasmenu(this.category.id,this.form.value).subscribe (
      datos => {
        console.log('hola'+ datos);
        //this.ngOnInit();
      }
    )
  }
}
