import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  selector: 'app-fixed-costs-dialog',
  templateUrl: './fixed-costs-dialog.component.html',
  styleUrls: ['./fixed-costs-dialog.component.scss']
})
export class FixedCostsDialogComponent implements OnInit {
  public form!: FormGroup;
  constructor(public dialogRef: MatDialogRef<FixedCostsDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              public fb: FormBuilder) { }
  

  ngOnInit(): void {
    this.form = this.fb.group({
      id_gasto: 0, 
      descripcion: ['', Validators.required],      
      tipo_gasto: ['', Validators.required],
      cantidad: ['', Validators.required],
      fecha: ['', Validators.required],
      id_sucursal: ['', Validators.required],
      periodicidad: ['', Validators.required],  
      status: ['', Validators.required], 
           
     
    }); 

    if(this.data.customer){
      this.form.patchValue(this.data.customer); 
    };
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
