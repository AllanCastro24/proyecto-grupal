import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Category } from 'src/app/app.models';
import {AppService} from 'src/app/app.service';

@Component({
  selector: 'app-categoria-dialog-productos',
  templateUrl: './categoria-dialog-productos.component.html',
  styleUrls: ['./categoria-dialog-productos.component.scss']
})
export class CategoriaDialogProductosComponent implements OnInit {

  public form!: FormGroup;
  constructor(public dialogRef: MatDialogRef<CategoriaDialogProductosComponent>,
              @Inject(MAT_DIALOG_DATA) public category: Category,
              public fb: FormBuilder, private service: AppService) { }
  id_categoria: any;
  ngOnInit(): void { 
    this.form = this.fb.group({
      id: 0,
      name: [null, Validators.required],
      description: [null, Validators.required] 
    }); 

   

    if(this.category){
      this.id_categoria = this.category.id_categoria_insumos;
      this.form = this.fb.group({
        id: this.category.id_categoria_insumos,
        name: [this.category.categoria, Validators.required],
        description: [this.category.descripcion, Validators.required] 
      }); 

      //console.log(this.id_categoria);
    };

  }

  public onSubmit(){ 
    if(this.form.valid){
      this.dialogRef.close(this.form.value);
     // console.log(this.form.value.name + " / "+ this.form.value.description)



      if (this.category) {
        console.log("UPDATE");

        let categoria = {
          categoria: this.form.value.name,
          descripcion: this.form.value.description
        }
        this.service.UpdateCategoria(this.id_categoria, categoria).subscribe(respuesta => {
          console.log(respuesta);
        });

      } else {
        console.log("INSERT");

        let categoria = {
          categoria: this.form.value.name,
          descripcion: this.form.value.description
        }
        this.service.CreateCategoria(categoria).subscribe(respuesta => {
          console.log(respuesta);
        });
      }
      

    }

    
   


  }

}
