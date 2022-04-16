import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { PipesModule } from '../../theme/pipes/pipes.module';
import { CategoriesComponent } from './categories.component';
import { CategoryItemComponent } from './category-item/category-item.component';
import { CategorySearchComponent } from './category-search/category-search.component';
import { CategorySingleComponent } from './category-single/category-single.component';

export const routes = [
  { path: '', component: CategoriesComponent, pathMatch: 'full' },
  { path: ':id', component: CategorySingleComponent }
];

@NgModule({
  declarations: [
    CategoriesComponent, 
    CategoryItemComponent,
    CategorySearchComponent,
    CategorySingleComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
    PipesModule,
  ]
})
export class CategoriesModule { }
