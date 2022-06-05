import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PlateComponent } from './plate/plate.component';
import { PipesModule } from 'src/app/theme/pipes/pipes.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { WaiterMenuComponent } from './waiter-menu.component';

export const routes = [
  { path: ':id/:companyId/:tableId', component: WaiterMenuComponent },
  { path: ':id/:companyId/plate/:plateId/:tableId', component: PlateComponent },
];

@NgModule({
  declarations: [WaiterMenuComponent, PlateComponent],
  imports: [CommonModule, RouterModule.forChild(routes), SharedModule, PipesModule],
})
export class WaiterMenuModule {}
