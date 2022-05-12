import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { PipesModule } from '../../theme/pipes/pipes.module';
import { CategoriesComponent } from '../categories/categories.component';
import { RestaurantSingleComponent } from './restaurant-single/restaurant-single.component';
import { PlateComponent } from './plate/plate.component';
import { RestaurantInfoComponent } from './restaurant-info/restaurant-info.component';

export const routes = [
  { path: '', component: CategoriesComponent, pathMatch: 'full' },
  { path: ':id', component: RestaurantSingleComponent },
  { path: ':restaurantId/plate/:plateId', component: PlateComponent },
  { path: 'info/:id', component: RestaurantInfoComponent },
];

@NgModule({
  declarations: [RestaurantSingleComponent, PlateComponent, RestaurantInfoComponent],
  imports: [CommonModule, RouterModule.forChild(routes), SharedModule, PipesModule],
})
export class RestaurantsModule {}
