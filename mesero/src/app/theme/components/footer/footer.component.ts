import { Component, OnInit } from '@angular/core';
import { RestaurantService } from 'src/app/pages/restaurants/restaurant.service';
import { Menu } from '../menu/menu.model';
import { MenuService } from '../menu/menu.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit {
  public menuItems: Array<Menu> = [];

  public show: boolean = true;

  constructor(public menuService: MenuService, public restaurantService: RestaurantService) {}

  ngOnInit() {
    this.menuItems = this.menuService.getVerticalMenuItems();
    console.log(this.menuItems);

    this.menuService.callToggleMenu.subscribe((data) => {
      this.show = data;
    });

    this.restaurantService.calculateCartListTotal();
  }

  onClick(menuId: number) {
    this.menuService.toggleMenuItem(menuId);
  }
}
