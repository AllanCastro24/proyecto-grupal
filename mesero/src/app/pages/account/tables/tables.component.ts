import { Component, OnInit } from '@angular/core';
import { MenuService } from 'src/app/theme/components/menu/menu.service';
import { Plate } from '../../restaurants/plates';
import { RestaurantService } from '../../restaurants/restaurant.service';
import { Restaurant } from '../../restaurants/restaurants';
import { Status, Table, _Status } from './waiter-menu/waiter';
import { WaiterService } from './waiter-menu/waiter.service';

@Component({
  selector: 'app-tables',
  templateUrl: './tables.component.html',
  styleUrls: ['./tables.component.scss'],
})
export class TablesComponent implements OnInit {
  public tablesList: Table[] = [];

  public restaurants: Restaurant[] = [];

  public restaurantId!: number;
  public companyId!: number;

  public currentTable: number = 1;

  public status: _Status[] = [
    {
      id: 1,
      name: 'Estan comiendo',
    },
    {
      id: 2,
      name: 'Sin aceptar',
    },
    {
      id: 3,
      name: 'Vas en camino',
    },
    {
      id: 4,
      name: 'Completar',
    },
    {
      id: 5,
      name: 'Completado',
    },
    {
      id: 6,
      name: 'Cancelado',
    },
  ];

  constructor(public restaurantService: RestaurantService, public menuService: MenuService, public waiterService: WaiterService) {}

  ngOnInit(): void {
    this.getTablesList();
    this.getNextTable();

    this.menuService.toggleMenu(true);
  }

  public getNextTable() {
    this.currentTable += this.tablesList.length;
  }

  public getTablesList() {
    this.tablesList = this.waiterService.getTables();
  }

  public getTotalItems(items: Plate[]): number {
    return items.reduce((prev, curr) => prev + curr.cartCount, 0);
  }

  public getTotalPrice(items: Plate[]): number {
    return items.reduce((prev, curr) => prev + curr.cartCount * curr.price, 0);
  }

  public getStatus(table: Table) {
    return table.status?.name;
  }

  public restartTables() {
    this.tablesList.length = 0;
    this.currentTable = 1;

    this.waiterService.restartTables();
  }

  public dateToString(date: string) {
    return new Date(Number(date)).toLocaleString();
  }
}
