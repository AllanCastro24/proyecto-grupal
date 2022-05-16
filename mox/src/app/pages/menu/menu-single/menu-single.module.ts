import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../../shared/shared.module';
import { PipesModule } from '../../../theme/pipes/pipes.module';
import { MenuSucursalComponent } from './menu-sucursal/menu-sucursal.component';
import { MenuSingleComponent } from './menu-single.component';
//import { MenuComponent } from './menu-single.component';
//import { MenuSingleComponent } from './menu-single.component';



export const routes = [
 // { path: '', component: MenuSucursalComponent, pathMatch: 'full' },
  //{ path: ':id', component: MenuSingleComponent },
  //{ path: ':idsuc', component: MenuSucursalComponent }
 // { path: '/sss', component: MenuSucursalComponent, pathMatch: 'full' },
  { path: ':idsuc', component: MenuSucursalComponent },
];

@NgModule({
  declarations: [
    
  
    MenuSucursalComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
    PipesModule
  ]
})
export class MenuSingle { }
