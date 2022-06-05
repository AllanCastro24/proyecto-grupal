import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Plate } from 'src/app/pages/restaurants/plates';
import { UsersService } from 'src/app/users/users.service';
import { environment } from 'src/environments/environment';
import { Table, _status } from './waiter';

@Injectable({
  providedIn: 'root',
})
export class WaiterService {
  public url = environment.url + '/assets/data/';

  constructor(public http: HttpClient, public usersService: UsersService) {}

  public addTable(table: Table) {
    const user = this.usersService.getUser();

    if (!user.tableList) {
      user.tableList = [];
    }

    user.tableList.push(table);

    this.usersService.setUser(user);
  }

  public getTables(): Table[] {
    const user = this.usersService.getUser();

    if (!user.tableList) {
      return <Table[]>[];
    }

    return user.tableList;
  }

  public restartTables() {
    const user = this.usersService.getUser();

    user.tableList = [];

    this.usersService.setUser(user);
  }

  public updateTable(table: Table) {
    const user = this.usersService.getUser();

    if (!user.tableList) {
      return;
    }

    const tables = this.getTables();
    const index = tables.findIndex((currentTable) => currentTable.id == table.id);

    tables[index] = table;

    user.tableList = tables;

    this.usersService.setUser(user);
  }

  public addTableItem(tableId: number, plate: Plate) {
    const user = this.usersService.getUser();

    if (!user.tableList) {
      return;
    }

    const tables = this.getTables();
    const index = tables.findIndex((currentTable) => currentTable.id == tableId);

    if (index !== -1) {
      const items = user.tableList[index].items;
      const indexPlate = items.findIndex((currentPlate) => currentPlate.id == plate.id);

      if (indexPlate !== -1) {
        items[indexPlate] = plate;
      } else {
        user.tableList[index].items.push(plate);
      }

      user.tableList[index].items = items;
    } else {
      const table: Table = {
        id: tableId,
        date: Date.now().toString(),
        items: [plate],
        status: _status[0],
      };

      user.tableList.push(table);
    }

    this.usersService.setUser(user);
  }

  public getTable(tableId: number): Table {
    const tables = this.getTables() || [];
    const findTable = tables.find((currentTable) => currentTable.id == tableId) || <Table>{};

    return findTable;
  }

  public updateTableItems(tableId: number, items: Plate[]) {
    const user = this.usersService.getUser();
    const tables = this.getTables() || [];
    const index = tables.findIndex((currentTable) => currentTable.id == tableId);

    if (index !== -1) {
      tables[index].items = items;
      user.tableList = tables;
    }

    this.usersService.setUser(user);
  }

  public removeTableItems(tableId: number) {
    const user = this.usersService.getUser();
    const tables = this.getTables() || [];
    const index = tables.findIndex((currentTable) => currentTable.id == tableId);

    if (index !== -1) {
      tables[index].items.length = 0;
      user.tableList = tables;
    }

    this.usersService.setUser(user);
  }
}
