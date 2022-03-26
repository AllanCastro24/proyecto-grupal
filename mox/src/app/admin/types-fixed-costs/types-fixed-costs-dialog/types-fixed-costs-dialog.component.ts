import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-types-fixed-costs-dialog',
  templateUrl: './types-fixed-costs-dialog.component.html',
  styleUrls: ['./types-fixed-costs-dialog.component.scss']
})
export class TypesFixedCostsDialogComponent implements OnInit {

  public form!: FormGroup;
  constructor(public dialogRef: MatDialogRef<TypesFixedCostsDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              public fb: FormBuilder) { }
  

  ngOnInit(): void {
    this.form = this.fb.group({
      id_tipo: 0, 
      nombre: ['', Validators.required],            
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
