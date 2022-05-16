import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AppService } from 'src/app/app.service';
import { FixedCostsDialogComponent } from './fixed-costs-dialog/fixed-costs-dialog.component'
import { customers } from './customers';
// import { threadId } from 'worker_threads';

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
  public TiposGastos: any;
  public Sucursales:any;
  public stores = [
    { id: 1, name: 'Agua' },
    { id: 2, name: 'Luz' }
  ]
  public countries: any[] = [];

  constructor(public appService: AppService, public snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.countries = this.appService.getCountries();
    // this.initDataSource(customers);
    this.appService.ObtenerGastosFijos().subscribe(respuesta => {
      this.initDataSource(respuesta);
      console.log(respuesta);
      // this.Equipos = respuesta;
    });
    this.appService.ObtenerTiposGastosFijos().subscribe(respuesta => {
      // this.tipos_gastos=respuesta
      this.TiposGastos = respuesta;
      console.log(this.TiposGastos);
      // this.Equipos = respuesta;
    });
    this.appService.ObtenerSucursales().subscribe(respuesta =>{
      this.Sucursales=respuesta;
    })
  }

  public initDataSource(data: any) {
    this.dataSource = new MatTableDataSource(data);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  public remove(customer: any) {
    const index: number = this.dataSource.data.indexOf(customer);
    if (index !== 0) {
      const message = this.appService.getTranslateValue('MESSAGE.SURE_DELETE');
      let dialogRef = this.appService.openConfirmDialog('', message!);
      dialogRef.afterClosed().subscribe(dialogResult => {
        if (dialogResult) {
          // this.dataSource.data.splice(index, 1);
          // this.initDataSource(this.dataSource.data);
          this.appService.BajaGastoFijo(customer, this.dataSource.data).subscribe(respuesta => {
            // this.ruteador.navigateByUrl('/listar-torneo');
            this.dataSource.data.splice(index, 1);
            this.initDataSource(this.dataSource.data);


          });
        }
      });

    }
  }

  public openFixedCostsDialog(customer: any) {
    let data = {
      customer: customer,
      TipoGastos: this.TiposGastos,
      Sucursales: this.Sucursales
      // stores: this.stores,
      // countries: this.countries
    };
    const dialogRef = this.appService.openDialog(FixedCostsDialogComponent, data, 'theme-dialog');
    dialogRef.afterClosed().subscribe(cus => {
      if (cus) {
        let message = '';
        const index: number = this.dataSource.data.findIndex(x => x.id_gasto == cus.id_gasto);
        console.log(cus);
        // if (index !== 0) {
        if (cus.id_gasto !== 0) {
          // cus.splice(cus, 1);
          console.log("Modificacion " + cus);
          this.appService.EditarGastoFijo(cus.id_gasto, cus).subscribe(respuesta => {
            // this.ruteador.navigateByUrl('/listar-torneo');
            console.log(respuesta);
          });
          message = 'Gasto ' + cus.descripcion + ' con cantidad de ' + cus.cantidad + ' modificado exitosamente';
          // this.dataSource.data[index] = cus;
          // message = 'Gasto ' + cus.descripcion + ' con cantidad de ' + cus.cantidad + ' modificado exitosamente';
          // console.log("Id a editar: "+ cus.id_gasto);
          // console.log("Datos a editar " + cus);
          // this.appService.EditarGastoFijo(cus.id_gasto,cus).subscribe(respuesta => {
          //   // this.ruteador.navigateByUrl('/listar-torneo');
          //   console.log(respuesta);
          //   message = 'Gasto ' + cus.descripcion + ' con cantidad de ' + cus.cantidad + ' modificado exitosamente';

          // });
        }
        else {
          console.log("Datos a registrar " + cus);
          this.appService.InsertarGastoFijo(cus).subscribe(respuesta => {
            console.log(respuesta);
            // this.paginator.lastPage();
            
          });
          message = 'Nuevo gasto ' + cus.descripcion + ' con cantidad de ' + cus.cantidad + ' agregado exitosamente';
          // let last_customer = this.dataSource.data[this.dataSource.data.length - 1];
          // cus.id = last_customer.id + 1;
          // this.dataSource.data.push(cus);
          // this.paginator.lastPage();
          // message = 'Nuevo gasto ' + cus.descripcion + ' ' + cus.cantidad + ' agregado exitosamente';
        }
        this.initDataSource(this.dataSource.data);
        this.snackBar.open(message, '×', { panelClass: 'success', verticalPosition: 'top', duration: 3000 });
      }
    });
  }

}
