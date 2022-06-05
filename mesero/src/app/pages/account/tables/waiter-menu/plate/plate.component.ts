import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Plate } from 'src/app/pages/restaurants/plates';
import { RestaurantService } from 'src/app/pages/restaurants/restaurant.service';
import { MenuService } from 'src/app/theme/components/menu/menu.service';
import { UsersService } from 'src/app/users/users.service';
import { WaiterService } from '../waiter.service';

@Component({
  selector: 'app-plate',
  templateUrl: './plate.component.html',
  styleUrls: ['./plate.component.scss'],
})
export class PlateComponent implements OnInit {
  private sub: any;

  public restaurantId!: number;
  public companyId!: number;
  public plateId!: number;
  public tableId!: number;

  public quantityCount: number = 1;
  public price: number = 100;

  public plate!: Plate;

  public note: string = '';

  constructor(
    private _location: Location,
    private activatedRoute: ActivatedRoute,
    private restaurantService: RestaurantService,
    public menuService: MenuService,
    private snackBar: MatSnackBar,
    public waiterService: WaiterService,
    public router: Router
  ) {}

  ngOnInit() {
    this.sub = this.activatedRoute.params.subscribe((params) => {
      this.restaurantId = params['id'];
      this.companyId = params['companyId'];
      this.plateId = params['plateId'];
      this.tableId = params['tableId'];
    });

    this.menuService.toggleMenu(false);

    this.getPlate();
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  public getPlate() {
    this.restaurantService.getPlate(this.companyId, this.restaurantId, this.plateId).subscribe((plate) => {
      this.plate = plate;

      console.log(this.plate);
    });
  }

  public addTableItem() {
    this.plate.cartCount = this.quantityCount;

    if (this.plate.cartCount <= this.plate.availibilityCount) {
      this.plate.note = this.note;

      this.waiterService.addTableItem(this.tableId, this.plate);

      this.onReturn();
    } else {
      this.plate.cartCount = this.plate.availibilityCount;

      this.snackBar.open('No hay suficientes platillos, total: ' + this.plate.availibilityCount, '', {
        verticalPosition: 'top',
        duration: 3000,
        panelClass: ['error'],
      });
    }
  }

  public counterChange(count: number) {
    this.quantityCount = count;
  }

  public onReturn() {
    this.router.navigate(['/waiter-menu', this.restaurantId, this.companyId, this.tableId]);
  }
}
