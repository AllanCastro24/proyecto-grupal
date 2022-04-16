import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppService } from 'src/app/app.service';
import { CartOverviewComponent } from 'src/app/shared/cart-overview/cart-overview.component';
import { MenuService } from 'src/app/theme/components/menu/menu.service';

@Component({
  selector: 'app-restaurant-single',
  templateUrl: './restaurant-single.component.html',
  styleUrls: ['./restaurant-single.component.scss'],
})
export class RestaurantSingleComponent implements OnInit {
  private sub: any;

  constructor(public appService: AppService, public menuService: MenuService, private _location: Location, private activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.sub = this.activatedRoute.params.subscribe((params) => {
      // this.getMenuItemById(params['id']);
    });

    this.menuService.toggleMenu(false);
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  public openCart() {
    this.appService.openCart(CartOverviewComponent);
  }

  public onReturn() {
    this.menuService.toggleMenu(true);

    this._location.back();
  }
}
