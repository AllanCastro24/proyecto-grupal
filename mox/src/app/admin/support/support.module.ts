import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router'; 
import { SharedModule } from '../../shared/shared.module';
import { SupportComponent } from './support.component';

export const routes = [
  { path: '', component: SupportComponent, pathMatch: 'full' }
];

@NgModule({
  declarations: [SupportComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes), 
    SharedModule
  ]
})
export class SupportModule { }
