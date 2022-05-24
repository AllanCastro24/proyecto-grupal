import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router'; 
import { SharedModule } from '../../shared/shared.module'; 
import { OrdersComponent } from './orders/orders.component';
import { TransactionsComponent } from './transactions/transactions.component';

export const routes = [ 
  { path: '', redirectTo: 'orders', pathMatch: 'full'},
  { path: 'orders/:idtienda/:idsuc', component: OrdersComponent, data: { breadcrumb: 'Orders' } },
  { path: 'transactions/:idtienda/:idsuc', component: TransactionsComponent, data: { breadcrumb: 'Transactions' } } 
];

@NgModule({
  declarations: [
    OrdersComponent, 
    TransactionsComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes), 
    SharedModule
  ]
})
export class SalesModule { }
