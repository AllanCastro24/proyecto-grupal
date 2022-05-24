import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router'; 
import { SharedModule } from '../../shared/shared.module'; 
import { FixedCostsComponent } from './fixed-costs.component';
import { FixedCostsDialogComponent } from './fixed-costs-dialog/fixed-costs-dialog.component';

export const routes = [
  { path: '', component: FixedCostsComponent, pathMatch: 'full' }
];

@NgModule({
  declarations: [
    FixedCostsComponent,
    FixedCostsDialogComponent
    
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule 
  ]
})
export class FixedCostsModule { }