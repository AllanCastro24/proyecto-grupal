import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Category } from 'src/app/app.models';
import { AppService } from 'src/app/app.service';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { DateAdapter, MatNativeDateModule } from '@angular/material/core';

@Component({
  selector: 'app-modal-mermas',
  templateUrl: './modal-mermas.component.html',
  styleUrls: ['./modal-mermas.component.scss']
})

export class ModalMermasComponent implements OnInit {

  fecha: any;
  id:any;
  public form!: FormGroup;
  constructor(public dialogRef: MatDialogRef<ModalMermasComponent>,
              @Inject(MAT_DIALOG_DATA) public category: Category, public appService:AppService,
              public fb: FormBuilder, private dateAdapter: DateAdapter<Date>) {
                this.dateAdapter.setLocale('en-GB'); //dd/MM/yyyy
               }
  cat: any;
  ngOnInit(): void { 
    this.form = this.fb.group({
      id: 0,
      insumo: [null, Validators.required],
      fecha: [null, Validators.required],
      descripcion: null 
    }); 

    this.appService.GetInsumoCompuesto().subscribe(categories => {
      this.cat = categories;
    });


    if(this.category){
      this.id = this.category.id_merma;
      this.form.patchValue({
        insumo: this.category.id_insumos,
        fecha: this.category.fecha,
        descripcion: this.category.detalle
      });
    };
  }

  public onSubmit(){ 
    if(this.form.valid){
      var str = this.form.value.fecha.toLocaleString("locales");
      var splitted = str.split(",", 1); 
      this.dialogRef.close(this.form.value);
      var fecha_alter = splitted[0];
      var desfecha = fecha_alter.split("/", 3);
      if(desfecha[0] > 9){
        this.fecha = desfecha[2]+"-"+desfecha[0]+"-"+desfecha[1]
        console.log(this.fecha);
      }else{
        this.fecha = desfecha[2]+"-0"+desfecha[0]+"-"+desfecha[1]
        console.log(this.fecha);
      }
      

      if(this.category){ //EDITAR
        let merma = {
          id_detalle_insumo: this.form.value.insumo,
          fecha: this.fecha,
          detalle: this.form.value.descripcion
        }
        this.appService.ActualizarMerma(this.id, merma).subscribe(categories => {
        });
        
      }else{  //INSERTAR

        let merma = {
          id_detalle_insumo: this.form.value.insumo,
          fecha: this.fecha,
          detalle: this.form.value.descripcion
        }

        this.appService.InsertarMerma(merma).subscribe(categories => {
        });
      }

      

    }
  }


}
