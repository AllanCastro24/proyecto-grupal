import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router'; 
import { SharedModule } from '../../shared/shared.module';
import { ReviewsComponent } from './reviews.component';

export const routes = [
  { path: '', component: ReviewsComponent, pathMatch: 'full' }
];

@NgModule({
  declarations: [ReviewsComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes), 
    SharedModule
  ]
})
export class ReviewsModule { }
