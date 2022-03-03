import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AppService } from 'src/app/app.service';
import { emailValidator, maxWordsValidator } from 'src/app/theme/utils/app-validators';

@Component({
  selector: 'app-addresses',
  templateUrl: './addresses.component.html',
  styleUrls: ['./addresses.component.scss']
})
export class AddressesComponent implements OnInit {
  public addresses = new FormArray([]);
  public selected:number = 0;
  public countries:any[] = [];
  public billingAddress = {
    'firstName': 'Emilio',
    'lastName': 'Verdines',
    'middleName': '', 
    'company': '',
    'email': 'emilio.verdines@gmail.com',
    'phone': '(+100) 123 456 7890', 
    'country': 'US',
    'city': 'New York',
    'place': 'Brooklyn',
    'postalCode': '11213',
    'address': '1568 Atlantic Ave',
    'id': 1
  }

  constructor(public formBuilder: FormBuilder, public appService:AppService) { }

  ngOnInit(): void {
    this.countries = this.appService.getCountries();
    // this.addresses.push(this.createAddress()); // Billing address
    // this.addresses.controls[0].patchValue(this.billingAddress);
    // this.addresses.push(this.createAddress()); // Shipping address  

    this.addresses.controls.push(this.createAddress()); // Billing address
    this.addresses.controls[0].patchValue(this.billingAddress);
    this.addresses.controls.push(this.createAddress()); // Shipping address  
  }
  

  public createAddress(): FormGroup {
		// return this.formBuilder.group({
		// 	'firstName': [null, Validators.compose([Validators.required, maxWordsValidator(1)])],
		// 	'lastName': [null, Validators.compose([Validators.required, maxWordsValidator(1)])],
    //   'middleName': [null, maxWordsValidator(1)], 
    //   'company': '',
		// 	'email': [null, Validators.compose([Validators.required, emailValidator])],
		// 	'phone': [null, Validators.required], 
		// 	'country': [null, Validators.required],
		// 	'city': [null, Validators.required],
		// 	'place': [null, Validators.required],
		// 	'postalCode': [null, Validators.required],
		// 	'address': [null, Validators.required],
		// 	'id': 0
    // }); 

    let form: FormGroup = new FormGroup({});
    form.addControl('firstName', new FormControl('', Validators.compose([Validators.required, maxWordsValidator(1)])));
    form.addControl('lastName', new FormControl('', Validators.compose([Validators.required, maxWordsValidator(1)])));
    form.addControl('middleName', new FormControl('')); 
    form.addControl('company', new FormControl('')); 
    form.addControl('email', new FormControl('', Validators.compose([Validators.required, emailValidator]))); 
    form.addControl('phone', new FormControl('', Validators.required)); 
    form.addControl('country', new FormControl('', Validators.required)); 
    form.addControl('city', new FormControl('', Validators.required)); 
    form.addControl('place', new FormControl('', Validators.required)); 
    form.addControl('postalCode', new FormControl('', Validators.required)); 
    form.addControl('address', new FormControl('', Validators.required)); 
    form.addControl('id', new FormControl(0));
    return form; 
  }
  
  public addAddress() {
    this.addresses.push(this.createAddress()); 
    setTimeout(() => {
      this.selected = this.addresses.length-1; 
    }); 
  }

  public deleteAddress() {
		if(this.selected < 1){ 
			this.appService.openAlertDialog('You can not remove default billing information');
		}
		else{
			const message = this.appService.getTranslateValue('MESSAGE.SURE_DELETE');
			let dialogRef = this.appService.openConfirmDialog('', message!);
			dialogRef.afterClosed().subscribe(dialogResult => {
				if(dialogResult){ 
					this.addresses.removeAt(this.selected); 
				}
			});
		}
	}
  

  public save(){
		this.addresses.controls[this.selected].updateValueAndValidity();
		this.addresses.controls[this.selected].markAllAsTouched();
		if(this.addresses.controls[this.selected].valid){
			let data = (this.addresses.controls[this.selected] as FormGroup).getRawValue(); 
      if(this.selected > 0){
        console.log('Shipping address: ', data)
      }
      else{
        console.log('Billing address: ', data)
      }
		}
	}

  public onTabIndexChanged(index:number){
		this.selected = index; 
	}



}
