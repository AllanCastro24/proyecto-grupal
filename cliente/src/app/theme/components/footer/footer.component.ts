import { Component, OnInit } from '@angular/core';
import { skipWhile } from 'rxjs/internal/operators/skipWhile';
import { AppService } from 'src/app/app.service';
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

  constructor(public menuService: MenuService, public appService: AppService) {}

  ngOnInit() {
    this.menuItems = this.menuService.getVerticalMenuItems();
    console.log(this.menuItems);

    this.menuService.callToggleMenu.subscribe((data) => {
      this.show = data;
    });
  }

  onClick(menuId: number) {
    this.menuService.toggleMenuItem(menuId);
  }
}
