import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Category } from 'src/app/app.models';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-modal-tipo-pago',
  templateUrl: './modal-tipo-pago.component.html',
  styleUrls: ['./modal-tipo-pago.component.scss']
})
export class ModalTipoPagoComponent implements OnInit {

  public form!: FormGroup;
  constructor(public dialogRef: MatDialogRef<ModalTipoPagoComponent>,
              @Inject(MAT_DIALOG_DATA) public category: Category,
              public fb: FormBuilder, private service: AppService) { }
  id_TipoPago: any;
  ngOnInit(): void { 

    this.form = this.fb.group({
      id: 0,
      description: [null, Validators.required] 
    }); 

    if(this.category){
      this.id_TipoPago = this.category.id_tipo_pago;
      this.form = this.fb.group({
        id: this.category.id_tipo_pago,
        description: [this.category.descripcion, Validators.required] 
      }); 
    };

  }

  public onSubmit(){ 
    if(this.form.valid){
      this.dialogRef.close(this.form.value);
      if (this.category) {
        console.log("UPDATE");

        let categoria = {
          categoria: this.form.value.name,
          descripcion: this.form.value.description
        }
        this.service.UpdateTipo_Pago(this.id_TipoPago, categoria).subscribe(respuesta => {
          console.log(respuesta);
        });

      } else {
        console.log("INSERT");

        let categoria = {
          categoria: this.form.value.name,
          descripcion: this.form.value.description
        }
        this.service.InsertarTipo_Pago(categoria).subscribe(respuesta => {
          console.log(respuesta);
        });
      }
    }
  }

}
