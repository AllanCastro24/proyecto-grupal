import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { Order } from 'src/app/app.models';
import { AppService } from 'src/app/app.service';
import { OrderDetailsDialogComponent } from 'src/app/shared/order-details-dialog/order-details-dialog.component';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {
  displayedColumns: string[] = ['id', 'date', 'status.name', 'total', 'action', 'view'];
  dataSource!: MatTableDataSource<Order>;
  @ViewChild(MatPaginator, {static: true}) paginator!: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort!: MatSort;
  public statuses = [
    { id: 1, name: 'Terminado' },
    { id: 2, name: 'Procesando' },
    { id: 2, name: 'En espera' },
    { id: 2, name: 'Reembolsado' },
    { id: 2, name: 'Pendiente' }
  ];
  public idtienda:any;
  public idsucursal:any;
  constructor(public appService:AppService, public snackBar: MatSnackBar,private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.idtienda = this.activatedRoute.snapshot.paramMap.get('idtienda');
    this.idsucursal = this.activatedRoute.snapshot.paramMap.get('idsuc');
    /* this.appService.getOrders().subscribe((orders:Order[]) => { 
      this.initDataSource(orders);
    });  
 */
/* for (let index = 0; index < 100000; index++) {
  
  
} */
    this.appService.getOrderss(this.idtienda,this.idsucursal).subscribe((orders:Order[]) => { 
      this.initDataSource(orders);
      console.log(orders);
    });  
  }

  /* public enviarcorreo(){
    this.appService.enviarcorreo().subscribe((orders:Order[]) => { 
      this.initDataSource(orders);
      console.log(orders);
    }); 
  } */

  public initDataSource(data:any){
    this.dataSource = new MatTableDataSource(data);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    (this.dataSource.sortingDataAccessor as any) = (data:any, sortHeaderId: string) => {
      return this.getPropertyByPath(data, sortHeaderId);
    };
  }

  getPropertyByPath(obj: Object, pathString: string) {
    return pathString.split('.').reduce((o:any, i) => o[i], obj);
  }

  public onStatusSelectionChange(event:any, order:Order){  
    if(event.value){ 
      const index: number = this.dataSource.data.indexOf(order);    
      if(index !== -1) { 
        this.dataSource.data.find(item => item.id == order.id)!.estatus = event.value;  
        console.log(this.dataSource.data);
        console.log(order.idcli);
        this.initDataSource(this.dataSource.data);
        this.snackBar.open('Estado del pedido actualizado con éxito!', '×', { panelClass: 'success', verticalPosition: 'top', duration: 3000 });
       
      }  
      // modificar estatus de la comida ya oedida ya sea a aceptada o rechazada con botonoes
     // for (let index = 0; index < this.dataSource.data.length; index++) {
        //const element = array[index];
        console.log(this.dataSource.data[index]);
        this.appService.updateespedi(this.dataSource.data[index]).subscribe (
          datos => {
            console.log('hola'+ datos);
            console.log(this.dataSource.data[index]);
            //this.ngOnInit();
          }
        )
        this.appService.enviarcorreo(this.dataSource.data[index]).subscribe(datos => { 
          this.initDataSource(datos);
          console.log(datos);
        }); 
   // }
    this.ngOnInit();
    }
    
    
    //this.updatedatospedi(this.dataSource.data);
  }

  /* public updatedatospedi(datos:any){
    console.log(datos);
    this.appService.updateespedi(datos).subscribe (
      datos => {
        console.log('hola'+ datos);
        //this.ngOnInit();
      }
    )
  } */

  public view(order:Order){ 
    const dialogRef = this.appService.openDialog(OrderDetailsDialogComponent, order, 'theme-dialog');
    dialogRef.afterClosed().subscribe(data => {  
      if(data){ 
        console.log(data);
      } 
    });  
   
  }

  public receipt(order:Order){ 
     
  } 
   

}
