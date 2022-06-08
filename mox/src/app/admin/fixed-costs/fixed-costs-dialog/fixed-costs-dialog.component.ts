import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';


@Component({
  selector: 'app-fixed-costs-dialog',
  templateUrl: './fixed-costs-dialog.component.html',
  styleUrls: ['./fixed-costs-dialog.component.scss']
})
export class FixedCostsDialogComponent implements OnInit {
  public form!: FormGroup;
  public form2!:FormGroup;
  ExisteSucursal:boolean =false;
  ExisteTienda:boolean =false;
  constructor(public dialogRef: MatDialogRef<FixedCostsDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              public fb: FormBuilder, public router:Router) { }
  
              ExisteCookie:boolean = false;
  ngOnInit(): void {
    
    this.form2 = this.fb.group({
      id_gasto: 0,            
    }); 
    this.form = this.fb.group({
      id_gasto: 0, 
      descripcion: ['', Validators.required],      
      tipo_gasto: ['', Validators.required],
      cantidad: ['', Validators.required],
      fecha: ['', Validators.required],
      id_sucursal: ['', Validators.required],
      id_tienda: ['', Validators.required],
      periodicidad: ['', Validators.required],  
      status: ['', Validators.required], 
           
     
    }); 

    if(this.data.customer){
      this.form.patchValue(this.data.customer); 
      // this.form.value.id_gasto=this.data.customer;
      console.log(this.form.value.id_gasto);
    };
    this.ExisteCookie = localStorage.getItem('ID_usuario') ? true : false;
    if (this.ExisteCookie){
       let ID_sucursal = JSON.parse(localStorage.getItem("ID_sucursal")as string).ID_sucursal;
       let ID_tienda = JSON.parse(localStorage.getItem("ID_tienda")as string).ID_tienda;

       this.form.value.id_sucursal=ID_sucursal;
       this.form.value.id_tienda=ID_tienda;
    }
    else{
      this.router.navigate(['/']);
    }
  }

  public onSubmit(){ 
    if(this.form.valid){
      this.dialogRef.close(this.form.value);
    }
  }

  public compareFunction(o1: any, o2: any) {
    return (o1.name == o2.name && o1.code == o2.code);
  }

}
