import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator'; 
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { transactions } from './transactions';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Order, Transaction } from 'src/app/app.models';
import { AppService } from 'src/app/app.service';
import { OrderTicketDialogComponent } from 'src/app/shared/order-ticket-dialog/order-ticket-dialog.component';
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
  
  constructor(public appService:AppService, public snackBar: MatSnackBar) { } 

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource(transactions);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort; 

    this.appService.getOrderscomple().subscribe((transaction:Transaction[]) => { 
      this.initDataSource(transaction);
      console.log(transaction);
    });  
  }

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

  public view(transaction:any){  
    const dialogRef = this.appService.openDialog(OrderTicketDialogComponent, transaction, 'theme-dialog');
    dialogRef.afterClosed().subscribe(data => {  
      if(data){ 
        console.log(data);
      } 
    }); 
  }
  

}
