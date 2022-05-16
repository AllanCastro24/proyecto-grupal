import { Injectable } from '@angular/core';
import { UsersService } from 'src/app/users/users.service';
import { Address, Payment } from './account';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  constructor(public usersService: UsersService) {}

  public getAddress(index: number): Address {
    const addresses = this.usersService.getUser().addressList || [];

    if (!addresses.length || !addresses[index]) {
      return <Address>{};
    }

    return addresses[index];
  }

  public addAddress(address: Address, index: number) {
    const user = this.usersService.getUser();

    if (!user.addressList) {
      user.addressList = [];
    }

    if (user.addressList[index]) {
      user.addressList[index] = address;
    } else {
      user.addressList.push(address);
    }

    this.usersService.setUser(user);
  }

  public getAddresses() {
    return this.usersService.getUser().addressList || [];
  }

  public removeAddress(index: number) {
    const user = this.usersService.getUser();

    user.addressList?.splice(index, 1);

    this.usersService.setUser(user);
  }

  public getDefaultAddress(): number {
    const addresses = this.usersService.getUser().addressList || [];

    if (!addresses.length) {
      return -1;
    }

    return addresses.findIndex((address) => address.default);
  }

  public setDefaultAddress(index: number) {
    const user = this.usersService.getUser();
    const addresses = this.usersService.getUser().addressList || [];

    if (!addresses.length || !addresses[index]) {
      return;
    }

    console.log(addresses[index]);

    const findIndexDefault = addresses.findIndex((address) => address.default);
    addresses[findIndexDefault].default = false;

    addresses[index].default = true;

    user.addressList = addresses;

    this.usersService.setUser(user);
  }

  public getPayment(index: number): Payment {
    const payments = this.usersService.getUser().paymentList || [];

    if (!payments.length || !payments[index]) {
      return <Payment>{};
    }

    return payments[index];
  }

  public addPayment(payment: Payment, index: number) {
    const user = this.usersService.getUser();

    if (!user.paymentList) {
      user.paymentList = [];
    }

    if (user.paymentList[index]) {
      user.paymentList[index] = payment;
    } else {
      user.paymentList.push(payment);
    }

    this.usersService.setUser(user);
  }

  public getPayments() {
    return this.usersService.getUser().paymentList || [];
  }

  public removePayment(index: number) {
    const user = this.usersService.getUser();

    user.paymentList?.splice(index, 1);

    this.usersService.setUser(user);
  }

  public getDefaultPayment(): number {
    const payments = this.usersService.getUser().paymentList || [];

    if (!payments.length) {
      return -1;
    }

    return payments.findIndex((payment) => payment.default);
  }

  public setDefaultPayment(index: number) {
    const user = this.usersService.getUser();
    const payments = this.usersService.getUser().paymentList || [];

    if (!payments.length || !payments[index]) {
      return;
    }

    console.log(payments[index]);

    const findIndexDefault = payments.findIndex((payment) => payment.default);
    payments[findIndexDefault].default = false;

    payments[index].default = true;

    user.paymentList = payments;

    this.usersService.setUser(user);
  }
}
