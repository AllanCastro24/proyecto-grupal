import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Category } from 'src/app/app.models';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-categoria-dialog-medida',
  templateUrl: './categoria-dialog-medida.component.html',
  styleUrls: ['./categoria-dialog-medida.component.scss']
})
export class CategoriaDialogMedidaComponent implements OnInit {

  public form!: FormGroup;
  constructor(public dialogRef: MatDialogRef<CategoriaDialogMedidaComponent>,@Inject(MAT_DIALOG_DATA) public category: Category,
  public fb: FormBuilder, private service: AppService) { }
  id_UnidadMedida: any;
  ngOnInit(): void { 
    this.form = this.fb.group({
      id: 0,
      name: [null, Validators.required],
      description: [null, Validators.required] 
    }); 

    if(this.category){
      this.id_UnidadMedida = this.category.id_unidad_de_medida;
      this.form = this.fb.group({
        id: this.id_UnidadMedida,
        name: [this.category.unidad, Validators.required],
        description: [this.category.descripcion, Validators.required] 
      }); 

      /* this.form.patchValue(this.category); 
      console.log(this.category); */
    };
  }
  /* descripcion: "Kilogramos"
id_unidad_de_medida: 1
unidad: "Kg" */

  public onSubmit(){ 
   
    if(this.form.valid){
      this.dialogRef.close(this.form.value);
      if (this.category) {
        console.log("UPDATE");

        let categoria = {
          unidad: this.form.value.name,
          descripcion: this.form.value.description
        }
        this.service.UpdateUnidadMedida(this.id_UnidadMedida, categoria).subscribe(respuesta => {
          console.log(respuesta);
        });

      } else {
        console.log("INSERT");

        let categoria = {
          unidad: this.form.value.name,
          descripcion: this.form.value.description
        }
        this.service.InsertarUnidadMedida(categoria).subscribe(respuesta => {
          console.log(respuesta);
        });
      }
    }


  }


  

}
