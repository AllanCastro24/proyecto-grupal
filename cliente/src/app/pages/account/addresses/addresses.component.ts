import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AppService } from 'src/app/app.service';
import { MenuService } from 'src/app/theme/components/menu/menu.service';
import { emailValidator, maxWordsValidator } from 'src/app/theme/utils/app-validators';
import { AccountService } from '../account.service';

@Component({
  selector: 'app-addresses',
  templateUrl: './addresses.component.html',
  styleUrls: ['./addresses.component.scss'],
})
export class AddressesComponent implements OnInit {
  public addresses = new FormArray([]);
  public selected: number = 0;
  public countries: any[] = [];
  public billingAddress = {
    firstName: '(test) Emilio',
    lastName: 'Verdines',
    middleName: '',
    company: '',
    email: 'emilio.verdines@gmail.com',
    phone: '(+100) 123 456 7890',
    country: 'US',
    city: 'New York',
    place: 'Brooklyn',
    postalCode: '11213',
    address: '1568 Atlantic Ave',
    id: 1,
  };

  constructor(
    public formBuilder: FormBuilder,
    public appService: AppService,
    public accountService: AccountService,
    public menuService: MenuService
  ) {}

  ngOnInit(): void {
    this.countries = this.appService.getCountries();

    this.getAddresses();
    this.setDefaultAddress();
    this.setTestAddress();

    this.menuService.toggleMenu(true);
  }

  public setTestAddress() {
    this.addresses.controls.push(this.createAddress()); // Billing address
    this.addresses.controls[this.addresses.controls.length - 1].patchValue(this.billingAddress);
  }

  public getAddresses() {
    const addresses = this.accountService.getAddresses();

    for (let i = 0; i < addresses.length; i++) {
      this.addresses.controls.push(this.createAddress());
      this.addresses.controls[i].patchValue(addresses[i]);
    }
  }

  public setDefaultAddress() {
    this.selected = this.accountService.getDefaultAddress();
  }

  public createAddress(): FormGroup {
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
      this.selected = this.addresses.length - 1;
    });
  }

  public deleteAddress() {
    const message = this.appService.getTranslateValue('MESSAGE.SURE_DELETE');
    let dialogRef = this.appService.openConfirmDialog('', message!);

    dialogRef.afterClosed().subscribe((dialogResult) => {
      if (dialogResult) {
        this.addresses.removeAt(this.selected);
        this.accountService.removeAddress(this.selected);
      }
    });
  }

  public save() {
    this.addresses.controls[this.selected].updateValueAndValidity();
    this.addresses.controls[this.selected].markAllAsTouched();

    if (this.addresses.controls[this.selected].valid) {
      let data = (this.addresses.controls[this.selected] as FormGroup).getRawValue();
      data.id = this.addresses.controls.length;
      data.default = true;

      this.accountService.addAddress(data, this.selected);
      this.accountService.setDefaultAddress(this.selected);
    }
  }

  public onTabIndexChanged(index: number) {
    this.selected = index;
    this.accountService.setDefaultAddress(index);
  }
}
