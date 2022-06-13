import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { PipesModule } from '../../theme/pipes/pipes.module';
import { MenuComponent } from './menu.component';
import { MenuSingleComponent } from './menu-single/menu-single.component';
import { MenuSucursalComponent } from './menu-single/menu-sucursal/menu-sucursal.component';



export const routes = [
  { path: '', component: MenuComponent, pathMatch: 'full' },
  { path: ':id/:idsuc', component: MenuSingleComponent },
  //{ path: '/suc', component: MenuSucursalComponent },
  { path: ':idsuc', component: MenuSucursalComponent }
];

@NgModule({
  declarations: [
    MenuComponent, 
    MenuSingleComponent,
    
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
    PipesModule
  ]
})
export class MenuModule { }
