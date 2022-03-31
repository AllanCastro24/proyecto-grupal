import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AppService } from 'src/app/app.service';
import { FixedCostsDialogComponent } from './fixed-costs-dialog/fixed-costs-dialog.component'
import { customers } from './customers';

@Component({
  selector: 'app-fixed-costs',
  templateUrl: './fixed-costs.component.html',
  styleUrls: ['./fixed-costs.component.scss']
})
export class FixedCostsComponent implements OnInit {
  displayedColumns: string[] = ['tipo_gasto', 'descripcion', 'cantidad', 'fecha', 'id_sucursal', 'periodicidad', 'status', 'actions'];
  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  public stores = [
    { id: 1, name: 'Agua' },
    { id: 2, name: 'Luz' }
  ]
  public countries: any[] = [];

  constructor(public appService: AppService, public snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.countries = this.appService.getCountries();
    this.initDataSource(customers);
  }

  public initDataSource(data: any) {
    this.dataSource = new MatTableDataSource(data);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  public remove(customer: any) {
    const index: number = this.dataSource.data.indexOf(customer);
    if (index !== -1) {
      const message = this.appService.getTranslateValue('MESSAGE.SURE_DELETE');
      let dialogRef = this.appService.openConfirmDialog('', message!);
      dialogRef.afterClosed().subscribe(dialogResult => {
        if (dialogResult) {
          this.dataSource.data.splice(index, 1);
          this.initDataSource(this.dataSource.data);
        }
      });
    }
  }

  public openFixedCostsDialog(customer: any) {
    let data = {
      customer: customer,
      stores: this.stores,
      countries: this.countries
    };
    const dialogRef = this.appService.openDialog(FixedCostsDialogComponent, data, 'theme-dialog');
    dialogRef.afterClosed().subscribe(cus => {
      if (cus) {
        let message = '';
        const index: number = this.dataSource.data.findIndex(x => x.id == cus.id);
        if (index !== -1) {
          this.dataSource.data[index] = cus;
          message = 'Gasto ' + cus.descripcion + ' con cantidad de ' + cus.cantidad + ' modificado exitosamente';
        }
        else {
          let last_customer = this.dataSource.data[this.dataSource.data.length - 1];
          cus.id = last_customer.id + 1;
          this.dataSource.data.push(cus);
          this.paginator.lastPage();
          message = 'Nuevo gasto ' + cus.descripcion + ' ' + cus.cantidad + ' agregado exitosamente';
        }
        this.initDataSource(this.dataSource.data);
        this.snackBar.open(message, '×', { panelClass: 'success', verticalPosition: 'top', duration: 3000 });
      }
    });
  }

}
