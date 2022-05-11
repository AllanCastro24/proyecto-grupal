import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { PipesModule } from '../../theme/pipes/pipes.module';
import { MenuComponent } from './menu.component';
import { MenuSingleComponent } from './menu-single/menu-single.component';
import { FrequentCategoriesComponent } from '../categories/frequent-categories/frequent-categories.component';
import { FrequentRestaurantsComponent } from '../categories/frequent-restaurants/frequent-restaurants.component';
import { FrequentPlatesComponent } from '../categories/frequent-plates/frequent-plates.component';

export const routes = [
  { path: '', component: MenuComponent, pathMatch: 'full' },
  { path: ':id', component: MenuSingleComponent }
];

@NgModule({
  declarations: [
    MenuComponent, 
    MenuSingleComponent,
    FrequentRestaurantsComponent,
    FrequentCategoriesComponent,
    FrequentPlatesComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
    PipesModule,
  ]
})
export class MenuModule { }
