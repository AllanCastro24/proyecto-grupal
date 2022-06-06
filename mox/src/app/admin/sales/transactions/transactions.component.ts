import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator'; 
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { transactions } from './transactions';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Order, Transaction } from 'src/app/app.models';
import { AppService } from 'src/app/app.service';
import { OrderTicketDialogComponent } from 'src/app/shared/order-ticket-dialog/order-ticket-dialog.component';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss']
})
export class TransactionsComponent implements OnInit {
  displayedColumns: string[] = ['orderId', 'transactionId', 'date', 'paymentMethod', 'status', 'amount', 'view'];
  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator, {static: true}) paginator!: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort!: MatSort;
  public idtienda:string = "";
  public idsucursal:string ="";
  ExisteCookie: boolean = false;
  //public artists:  Transaction[];
  constructor(public appService:AppService, public snackBar: MatSnackBar,private activatedRoute: ActivatedRoute) { } 

  ngOnInit(): void {
   /*  this.idtienda = this.activatedRoute.snapshot.paramMap.get('idtienda');
    this.idsucursal = this.activatedRoute.snapshot.paramMap.get('idsuc'); */
    this.ExisteCookie = localStorage.getItem('ID_usuario') ? true : false;
//Let mi_variable = ;
if (this.ExisteCookie) {
  this.idsucursal= JSON.parse(localStorage.getItem("ID_sucursal")as string).ID_sucursal;
  this.idtienda=JSON.parse(localStorage.getItem("ID_tienda")as string).ID_tienda;
}
    this.dataSource = new MatTableDataSource(transactions);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort; 

    this.appService.getOrderscomple(this.idtienda,this.idsucursal).subscribe((transaction:Transaction[]) => { 
      this.initDataSource(transaction);
      console.log(transaction);
    });  
  }
//dato estoy en conexion local cambiar a en linea
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

  public view(transaction:any, id:any){  
    const dialogRef = this.appService.openDialog(OrderTicketDialogComponent, transaction, 'theme-dialog');
    dialogRef.afterClosed().subscribe(data => {  
      if(data){ 
        console.log(data);
      } 
    }); 
    //this.statee(id);
    //this.mostrartiesuc(id);
  }

  public activo: any;
  public statee( id: any): void {

    
     
    /* this.appService.bajaplato3(this.idtienda, this.idsucursal,id, proveedor).subscribe((menuItems) => {
    }); */
    //this.ngOnInit();
   console.log(id);
   console.log("tienda: " + this.idtienda);
   console.log("suc: " + this.idsucursal);
   this.appService.getOrderscomple2(this.idtienda,this.idsucursal,id).subscribe((transactions:any[]) => { 
    //this.initDataSource(transaction);
    console.log(transactions);
  });  

  
   }

   datosmpl = null as any;

   mostrartiesuc( id: any){
     this.appService.getOrderscomple2(this.idtienda,this.idsucursal,id).subscribe(result => this.datosmpl  = result)
     console.log('holaaa'+ this.datosmpl);
     console.log(id);
   console.log("tienda: " + this.idtienda);
   console.log("suc: " + this.idsucursal);
     //this.suma();
     //this.insertarpla();
     //this.state();
   }
   
   hayregistropla(){
     if(this.datosmpl == null){
       return false;
     } else{
       return true;
     }
   }
  

}
