import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AppService } from 'src/app/app.service';
import { TypesFixedCostsDialogComponent } from './types-fixed-costs-dialog/types-fixed-costs-dialog.component'
import { customers } from './customers';


@Component({
  selector: 'app-types-fixed-costs',
  templateUrl: './types-fixed-costs.component.html',
  styleUrls: ['./types-fixed-costs.component.scss']
})
export class TypesFixedCostsComponent implements OnInit {
  displayedColumns: string[] = ['nombre', 'status', 'actions'];
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
    this.appService.ObtenerGastosFijos().subscribe(respuesta => {
      this.initDataSource(respuesta);
      // this.Equipos = respuesta;
    });
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
      this.appService.BajaGastoFijo(this.dataSource.data).subscribe(respuesta => {
        // this.ruteador.navigateByUrl('/listar-torneo');
        this.dataSource.data.splice(index, 1);
        this.initDataSource(this.dataSource.data);


      });
    }
  }

  public openTypesFixedCostsDialog(customer: any) {
    let data = {
      customer: customer,
      stores: this.stores,
      countries: this.countries
    };
    const dialogRef = this.appService.openDialog(TypesFixedCostsDialogComponent, data, 'theme-dialog');
    dialogRef.afterClosed().subscribe(cus => {
      if (cus) {
        let message = '';
        const index: number = this.dataSource.data.findIndex(x => x.id == cus.id);
        if (index !== -1) {
          this.dataSource.data[index] = cus;
          message = 'Tipo de gasto ' + cus.nombre + ' modificado exitosamente';
          // this.appService.EditarGastoFijo(cus.id,this.dataSource.data).subscribe(respuesta => {
          //   // this.ruteador.navigateByUrl('/listar-torneo');
          //   console.log(respuesta);
          //   alert("Torneo agregado con exito ");
          // message = 'Tipo de gasto ' + cus.nombre + ' modificado exitosamente';

          // });
        }
        else {
          // this.appService.InsertarGastoFijo(this.dataSource.data).subscribe(respuesta => {
          //   // this.ruteador.navigateByUrl('/listar-torneo');
          //   console.log(respuesta);
          //   alert("Torneo agregado con exito ");
          //   message = 'Nuevo gasto ' + cus.descripcion + ' ' + cus.cantidad + ' agregado exitosamente';
          // message = 'Nuevo tipo de gasto ' + cus.nombre + ' agregado exitosamente';

          // });
          let last_customer = this.dataSource.data[this.dataSource.data.length - 1];
          cus.id = last_customer.id + 1;
          this.dataSource.data.push(cus);
          this.paginator.lastPage();
          message = 'Nuevo tipo de gasto ' + cus.nombre + ' agregado exitosamente';
        }
        this.initDataSource(this.dataSource.data);
        this.snackBar.open(message, '×', { panelClass: 'success', verticalPosition: 'top', duration: 3000 });
      }
    });
  }

}
