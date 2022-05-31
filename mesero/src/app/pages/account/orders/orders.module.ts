import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../../shared/shared.module';
import { OrdersComponent } from './orders.component';
import { OrderComponent } from './order/order.component';

export const routes = [
  { path: '', component: OrdersComponent, pathMatch: 'full' },
  { path: ':id', component: OrderComponent }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule
  ],
  declarations: [
    OrdersComponent,
    OrderComponent
  ]
})
export class OrdersModule { }