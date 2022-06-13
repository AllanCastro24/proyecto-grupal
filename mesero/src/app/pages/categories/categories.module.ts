import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { PipesModule } from '../../theme/pipes/pipes.module';
import { CategoriesComponent } from './categories.component';
import { CategoryItemComponent } from './category-item/category-item.component';

export const routes = [
  { path: '', component: CategoriesComponent, pathMatch: 'full' },
];

@NgModule({
  declarations: [
    CategoriesComponent, 
    CategoryItemComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
    PipesModule,
  ]
})
export class CategoriesModule { }
