import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { Plate } from 'src/app/pages/restaurants/plates';
import { RestaurantService } from 'src/app/pages/restaurants/restaurant.service';
import { Company, Restaurant } from 'src/app/pages/restaurants/restaurants';
import { MenuService } from 'src/app/theme/components/menu/menu.service';
import { User } from 'src/app/users/users';
import { UsersService } from 'src/app/users/users.service';
import { Address } from '../../account';
import { Status, Table, _PaymentMethod, _Status, _status } from '../waiter-menu/waiter';
import { WaiterService } from '../waiter-menu/waiter.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit {
  private sub: any;

  public folioId!: number;
  public tableId!: number;
  public restaurantId!: number;
  public companyId!: number;

  public user!: User;
  public company!: Company;
  public restaurant!: Restaurant;
  public table!: Table;
  public tableItems: Plate[] = [];

  public restaurantAddress: string = '';
  public clientAddress!: Address;

  public subtotal: number = 0;
  public total: number = 0;

  public status = Status;
  public currentStatus!: _Status;
  public paymentMethods: _PaymentMethod[] = [
    {
      id: 1,
      name: 'Efectivo',
    },
    {
      id: 2,
      name: 'Tarjeta de crédito',
    },
    {
      id: 3,
      name: 'Tarjeta de débito',
    },
  ];
  public btnStatus: any = ['Terminar', 'Pagar', 'Pagado'];
  public btnCurrentStatus: string = this.btnStatus[0];

  public tableForm!: FormGroup;

  @ViewChild('pdf', { static: false }) pdf!: ElementRef;

  constructor(
    private activatedRoute: ActivatedRoute,
    public usersService: UsersService,
    public restaurantService: RestaurantService,
    public menuService: MenuService,
    public router: Router,
    public fb: FormBuilder,
    public waiterService: WaiterService,
  ) {}

  async ngOnInit() {
    this.sub = this.activatedRoute.params.subscribe((params) => {
      this.tableId = params['id'];
    });

    this.menuService.toggleMenu(false);

    await this.setData();
    await this.getRestaurant();
    await this.getCompanyName();
    this.getUser();
    this.getTableItems();
    this.updateTotal();
    this.setupForm();
    this.setStatus();
    this.setPaymentMethod();
    this.toggleInfo();

    console.log(this.tableItems, this.restaurantId, this.companyId);
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  public async setData() {
    this.restaurantId = 1;
    this.companyId = 1;
    this.folioId = 1;
  }

  public getUser() {
    this.user = this.usersService.getUser();
  }

  public async getRestaurant() {
    this.restaurant = await this.restaurantService.getRestaurant(this.companyId, this.restaurantId);
  }

  public async getCompanyName() {
    const companies = (await this.restaurantService.getCompanies().toPromise()) || [];

    this.company = companies.find((company) => company.id == this.companyId) || <Company>{};
  }

  public getTableItems() {
    this.table = this.waiterService.getTable(this.tableId);
    this.tableItems = this.table.items || [];

    if (!this.tableItems) {
      return;
    }

    this.subtotal = this.tableItems.reduce((acc, cur) => acc + cur.price * cur.cartCount, 0);
  }

  public getTotalItems(plate: Plate) {
    return plate.cartCount * plate.price;
  }

  public updateTotal() {
    this.total = this.subtotal + this.subtotal * 0.1;
  }

  public onReturn() {
    this.menuService.toggleMenu(true);
    this.router.navigate(['/tables']);
  }

  public setStatus() {
    this.currentStatus = this.table.status || _status[0];

    switch (this.currentStatus.id) {
      case this.status.TakingNote:
        this.btnCurrentStatus = this.btnStatus[0];
        break;
      case this.status.UnPaid:
        this.btnCurrentStatus = this.btnStatus[1];
        break;
      case this.status.Paid:
        this.btnCurrentStatus = this.btnStatus[2];
        const elems: any = document.querySelectorAll('#openMenu');

        for (const el of elems) {
          el.style.display = 'none';
        }

        this.tableForm.controls['paymentMethod'].disable();
        break;
    }
  }

  public changeStatus() {
    switch (this.currentStatus.id) {
      case this.status.TakingNote:
        if (!this.tableItems.length) {
          return;
        }

        this.table.status = _status[this.status.UnPaid];
        break;
      case this.status.UnPaid:
        if (!this.tableForm.valid) {
          return;
        }

        this.table.status = _status[this.status.Paid];
        this.table.paymentMethod = this.getPaymentMethod(this.tableForm.value.paymentMethod);
        break;
      case this.status.Paid:
        console.log(this.tableForm.get('paymentMethod')?.value);
        this.onReturn();
    }

    this.waiterService.updateTable(this.table);
    this.setStatus();
  }

  public setPaymentMethod() {
    const value = this.table.paymentMethod ? this.table.paymentMethod.id : 1;

    this.tableForm.controls['paymentMethod'].setValue(value);
  }

  public cancelTable() {
    this.table.status = _status[this.status.Canceled];
    this.waiterService.updateTable(this.table);
  }

  public setupForm() {
    this.tableForm = this.fb.group({
      paymentMethod: [null, Validators.required],
      rememberMe: false,
    });
  }

  public toggleInfo(moreElems: any = []) {
    const elems = Array.from(document.querySelectorAll('#more-info, #thanks'));
    const AllElems: any = [...elems, ...moreElems];

    for (const el of AllElems) {
      el.style.display = el.style.display == 'none' ? 'block' : 'none';
    }
  }

  public async downloadAsPDF() {
    const elems = document.querySelectorAll('#paymentMethodLabel, #paymentMethod');

    this.toggleInfo(elems);

    html2canvas(this.pdf.nativeElement, { allowTaint: true }).then((canvas) => {
      let HTML_Width = canvas.width;
      let HTML_Height = canvas.height;
      let top_left_margin = 15;
      let PDF_Width = HTML_Width + top_left_margin * 2;
      let PDF_Height = HTML_Height + top_left_margin * 2;
      let canvas_image_width = HTML_Width;
      let canvas_image_height = HTML_Height;

      canvas.getContext('2d');

      let imgData = canvas.toDataURL('image/jpeg', 1.0);
      let pdf = new jsPDF('p', 'pt', [PDF_Width, PDF_Height]);
      pdf.addImage(imgData, 'JPG', top_left_margin, top_left_margin, canvas_image_width, canvas_image_height);

      pdf.save('ticket.pdf');

      this.toggleInfo(elems);
    });
  }

  public getPaymentMethod(id: number): _PaymentMethod {
    return this.paymentMethods.find((paymentMethod) => paymentMethod.id == id) || <_PaymentMethod>{};
  }

  public dateToString(date: string) {
    return new Date(Number(date)).toLocaleString();
  }
}
