import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router'; 
import { SharedModule } from '../../shared/shared.module'; 
import { ScheduledFixedExpensesComponent } from './scheduled-fixed-expenses.component';
import { ScheduledFixedExpensesDialogComponent } from './scheduled-fixed-expenses-dialog/scheduled-fixed-expenses-dialog.component';

export const routes = [
    { path: '', component: ScheduledFixedExpensesComponent, pathMatch: 'full' }
  ];
  
  @NgModule({
    declarations: [
      ScheduledFixedExpensesComponent,
      ScheduledFixedExpensesDialogComponent
      
    ],
    imports: [
      CommonModule,
      RouterModule.forChild(routes),
      SharedModule 
    ]
  })
  export class ScheduledFixedExpensesModule { }
