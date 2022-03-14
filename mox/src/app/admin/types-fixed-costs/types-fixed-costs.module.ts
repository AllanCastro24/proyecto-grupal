import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router'; 
import { SharedModule } from '../../shared/shared.module'; 
import { TypesFixedCostsComponent } from './types-fixed-costs.component';
import { TypesFixedCostsDialogComponent } from './types-fixed-costs-dialog/types-fixed-costs-dialog.component';

export const routes = [
  { path: '', component: TypesFixedCostsComponent, pathMatch: 'full' }
];

@NgModule({
  declarations: [
    TypesFixedCostsComponent,
    TypesFixedCostsDialogComponent
    
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule 
  ]
})
export class TypesFixedCostsModule { }