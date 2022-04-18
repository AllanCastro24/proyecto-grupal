import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { emailValidator } from 'src/app/theme/utils/app-validators';

@Component({
  selector: 'app-reports-stock',
  templateUrl: './reports-stock.component.html',
  styleUrls: ['./reports-stock.component.scss']
})
export class ReportsStockComponent implements OnInit {
  public form!: FormGroup;
  public hours = ['1:00am', '2:00am', '3:00am', '4:00am', '5:00am', '6:00am', '7:00am', '8:00am', '9:00am', '10:00am', '11:00am', '12:00am',
    '1:00pm', '2:00pm', '3:00pm', '4:00pm', '5:00pm', '6:00pm', '7:00pm', '8:00pm', '9:00pm', '10:00pm', '11:00pm', '12:00pm'];
  public today = new Date();
  @Output() onFormSubmit: EventEmitter<any> = new EventEmitter();

  constructor(public formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      "buscarPor": [null, Validators.required ], 
      "fecha": null,
      "fecha2" : null,
      "dia":null,                            
    });
  }

  public onSubmit(){
    console.log(this.form.value);
  }  

}
