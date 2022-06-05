import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../../shared/shared.module';
import { TablesComponent } from './tables.component';
import { TableComponent } from './table/table.component';

export const routes = [
  { path: '', component: TablesComponent, pathMatch: 'full' },
  { path: ':id', component: TableComponent }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule
  ],
  declarations: [
    TablesComponent,
    TableComponent
  ]
})
export class TablesModule { }