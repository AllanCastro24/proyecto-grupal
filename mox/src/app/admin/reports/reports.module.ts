import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router'; 
import { SharedModule } from '../../shared/shared.module'; 
import {ReportsSalesComponent} from './reports-sales/reports-sales.component';
import {ReportsStockComponent} from './reports-stock/reports-stock.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';


export const routes = [ 
  { path: '', redirectTo: 'reports-sale', pathMatch: 'full'},
  { path: 'reports-sales', component: ReportsSalesComponent, data: { breadcrumb: 'Reports-sales' } },
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
    SharedModule,
    NgxChartsModule
  ]
})
export class ReportsModule { }