import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router'; 
import { SharedModule } from '../../shared/shared.module';
import { RefundComponent } from './refund.component';

export const routes = [
  { path: '', component: RefundComponent, pathMatch: 'full' }
];

@NgModule({
  declarations: [RefundComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes), 
    SharedModule
  ]
})
export class RefundModule { }
