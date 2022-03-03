import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router'; 
import { SharedModule } from 'src/app/shared/shared.module';
import { AboutComponent } from './about.component';

export const routes = [
  { path: '', component: AboutComponent, pathMatch: 'full' }
];

@NgModule({
  declarations: [AboutComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule
  ]
})
export class AboutModule { }
