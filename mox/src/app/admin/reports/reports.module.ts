import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router'; 
import { SharedModule } from '../../shared/shared.module'; 
import {ReportsSalesComponent} from './reports-sales/reports-sales.component';
import {ReportsStockComponent} from './reports-stock/reports-stock.component';


export const routes = [ 
  { path: '', redirectTo: 'reports-sale', pathMatch: 'full'},
  { path: 'reports-sale', component: ReportsSalesComponent, data: { breadcrumb: 'Reports-sale' } },
  { path: 'reports-stock', component: ReportsStockComponent, data: { breadcrumb: 'Reports-stock' } } 
];

@NgModule({
  declarations: [
    ReportsSalesComponent, 
    ReportsStockComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes), 
    SharedModule
  ]
})
export class ReportsModule { }