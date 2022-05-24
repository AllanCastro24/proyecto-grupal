import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { emailValidator } from 'src/app/theme/utils/app-validators';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  public infoForm!:FormGroup; 
  constructor(public formBuilder: FormBuilder, public snackBar: MatSnackBar) { }

  ngOnInit() {
    this.infoForm = this.formBuilder.group({
      id: null,
      name: ['', Validators.compose([Validators.required, Validators.minLength(3)])],
      email: ['', Validators.compose([Validators.required, emailValidator])],
      image: null
    }); 
  }

  public onInfoFormSubmit():void {
    if (this.infoForm.valid) { 
      console.log(this.infoForm.value)
      this.snackBar.open('Se actualizó la información de la cuenta correctamente!', '×', { panelClass: 'success', verticalPosition: 'top', duration: 3000 });
    }
  } 

  public fileChange(files:any){ 
    if(files.length){
      this.infoForm.controls.image.patchValue(files[0].content); 
    } 
    else{
      this.infoForm.controls.image.patchValue(null); 
    }
  }
}
