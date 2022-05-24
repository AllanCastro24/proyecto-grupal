import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Category } from 'src/app/app.models';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-modal-stock',
  templateUrl: './modal-stock.component.html',
  styleUrls: ['./modal-stock.component.scss']
})
export class ModalStockComponent implements OnInit {

  
  public form!: FormGroup;
  constructor(public dialogRef: MatDialogRef<ModalStockComponent>,
              @Inject(MAT_DIALOG_DATA) public category: Category, public appService:AppService,
              public fb: FormBuilder) { }
    id: any;
  ngOnInit(): void { 
    this.form = this.fb.group({
      id: 0,
      insumo: [null, Validators.required],
      stock_minimo: null 
    }); 

    if(this.category){
      console.log(this.category);
      this.id = this.category.id_almacen;
      this.form.patchValue({
        id: this.form.value.id_almacen,
        insumo: this.category.codigo + " - "+ this.category.nombre,
        stock_minimo: this.category.stock_minimo
      });
    };
  }

  public onSubmit(){ 
    if(this.form.valid){
      let stock = {
        stock_minimo: this.form.value.stock_minimo
      }
      console.log(this.id)
      this.appService.ActualizarStockMinimo(this.id, stock).subscribe((categories) => {});
      this.dialogRef.close(this.form.value);

    }
  }

}
