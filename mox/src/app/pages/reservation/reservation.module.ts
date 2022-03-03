import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router'; 
import { SharedModule } from 'src/app/shared/shared.module';
import { ReservationComponent } from './reservation.component';

export const routes = [
  { path: '', component: ReservationComponent, pathMatch: 'full' }
];

@NgModule({
  declarations: [ReservationComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule
  ]
})
export class ReservationModule { }
