import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AppService } from 'src/app/app.service';
import { AccountService } from '../account.service';

@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.scss'],
})
export class PaymentsComponent implements OnInit {
  public payments = new FormArray([]);
  public selected: number = 0;
  public months: any[] = [];
  public years: any[] = [];
  public payment = {
    id: 1,
    name: '(test) Emilio Verdines',
    cardNumber: '4111111111111111',
    expiryMonth: '12',
    expiryYear: '2022',
    cvv: '123',
  };

  constructor(public formBuilder: FormBuilder, public appService: AppService, public accountService: AccountService) {}

  ngOnInit(): void {
    this.months = this.appService.getMonths();
    this.years = this.appService.getYears();
    console.log(this.years, this.months);
    this.getPayments();
    this.setDefaultPayment();
    this.setTestPayment();
  }

  public setTestPayment() {
    this.payments.controls.push(this.createPayment());
    this.payments.controls[this.payments.controls.length - 1].patchValue(this.payment);
  }

  public getPayments() {
    const payments = this.accountService.getPayments();

    for (let i = 0; i < payments.length; i++) {
      this.payments.controls.push(this.createPayment());
      this.payments.controls[i].patchValue(payments[i]);
    }
  }

  public setDefaultPayment() {
    this.selected = this.accountService.getDefaultPayment();
  }

  public createPayment(): FormGroup {
    let form: FormGroup = new FormGroup({});
    form.addControl('name', new FormControl('', Validators.required));
    form.addControl('cardNumber', new FormControl('', Validators.required));
    form.addControl('expiryMonth', new FormControl('', Validators.required));
    form.addControl('expiryYear', new FormControl('', Validators.required));
    form.addControl('cvv', new FormControl('', Validators.required));
    form.addControl('id', new FormControl(0));
    return form;
  }

  public addPayment() {
    this.payments.push(this.createPayment());

    setTimeout(() => {
      this.selected = this.payments.length - 1;
    });
  }

  public deletePayment() {
    const message = this.appService.getTranslateValue('MESSAGE.SURE_DELETE');
    let dialogRef = this.appService.openConfirmDialog('', message!);

    dialogRef.afterClosed().subscribe((dialogResult) => {
      if (dialogResult) {
        this.payments.removeAt(this.selected);
        this.accountService.removePayment(this.selected);
      }
    });
  }

  public save() {
    this.payments.controls[this.selected].updateValueAndValidity();
    this.payments.controls[this.selected].markAllAsTouched();

    if (this.payments.controls[this.selected].valid) {
      let data = (this.payments.controls[this.selected] as FormGroup).getRawValue();
      data.id = this.payments.controls.length;
      data.default = true;

      this.accountService.addPayment(data, this.selected);
      this.accountService.setDefaultPayment(this.selected);
    }
  }

  public onTabIndexChanged(index: number) {
    this.selected = index;
    this.accountService.setDefaultPayment(index);
  }
}
