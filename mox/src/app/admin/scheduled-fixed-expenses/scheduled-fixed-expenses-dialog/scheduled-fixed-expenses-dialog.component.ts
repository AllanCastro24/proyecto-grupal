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
      periodicidad: ['', Validators.required],
      status: ['', Validators.required],


    });

    if (this.data.customer) {
      this.form.patchValue(this.data.customer);
    };
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
