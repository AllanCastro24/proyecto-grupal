import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-scheduled-fixed-expenses-dialog',
  templateUrl: './scheduled-fixed-expenses-dialog.component.html',
  styleUrls: ['./scheduled-fixed-expenses-dialog.component.scss']
})
export class ScheduledFixedExpensesDialogComponent implements OnInit {
  public form!: FormGroup;
  public form2!: FormGroup;
  ExisteSucursal:boolean =false;
  ExisteTienda:boolean =false;
  ID_sucursal:string="";
  ID_tienda:string="";

  
  constructor(public dialogRef: MatDialogRef<ScheduledFixedExpensesDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public fb: FormBuilder) { }


  ngOnInit(): void {
    
    this.form2 = this.fb.group({
      id_gasto: 0,
    });
    this.form = this.fb.group({
      id_gasto_fijo: 0,
      descripcion: ['', Validators.required],
      tipo_gasto: ['', Validators.required],
      cantidad: ['', Validators.required],
      fecha: ['', Validators.required],
      id_sucursal: ['', Validators.required],
      id_tienda: ['', Validators.required],
      periodicidad: ['', Validators.required],
      status: ['', Validators.required],


    });

    if (this.data.customer) {
      this.form.patchValue(this.data.customer);
    };

    
    this.ExisteSucursal = localStorage.getItem('ID_sucursal') ? true : false;
    this.ExisteTienda = localStorage.getItem('ID_tienda') ? true : false;    
    if (this.ExisteSucursal){
       this.ID_sucursal = JSON.parse(localStorage.getItem("ID_sucursal")as string).ID_sucursal;
       this.ID_tienda = JSON.parse(localStorage.getItem("ID_tienda")as string).ID_tienda;

       this.form.value.id_sucursal=this.ID_sucursal;
       this.form.value.id_tienda=this.ID_tienda;
       console.log(this.form.value.id_sucursal);
       console.log(this.form.value.id_tienda);
    }


  }

  public onSubmit() {
    if (this.form.valid) {
      
      this.dialogRef.close(this.form.value);
      
    }
    
  }

  public compareFunction(o1: any, o2: any) {
    return (o1.name == o2.name && o1.code == o2.code);
  }

}
