import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TiendasComponent } from './tiendas/tiendas.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { RouterModule } from '@angular/router';
import { TiendasDialogComponent } from './tiendas/tiendas-dialog/tiendas-dialog.component';
import { SucursalesComponent } from './sucursales/sucursales.component';
import { SucursalesDialogComponent } from './sucursales/sucursales-dialog/sucursales-dialog.component';

export const routes = [ 
   { path: '', redirectTo: 'tiendas', pathMatch: 'full'},
  { path: 'tiendas', component: TiendasComponent, data: { breadcrumb: 'tiendas' } },
  { path: 'sucursales', component: SucursalesComponent, data: { breadcrumb: 'sucursales' } },
 /* { path: 'add/:id', component: AddComponent, data: { breadcrumb: 'Editar Productos' } }, 
  { path: 'unidad-medida', component: UnidadMedidaComponent, data: { breadcrumb: 'Unidad de Medida' } }, 
  { path: 'categorias-productos', component: CategoriasProductosComponent, data: { breadcrumb: 'Precio Venta' } },
  { path: 'Tipo-Pago', component: TipoPagoComponent, data: { breadcrumb: 'Tipo de Pago' } },
  { path: 'Mermas', component: MermasComponent, data: { breadcrumb: 'Mermas' } },
  { path: 'Add-Proveedor', component: AddProveedorComponent, data: { breadcrumb: 'Agregar Proveedores' } },
  { path: 'Add-Proveedor/:id', component: AddProveedorComponent, data: { breadcrumb: 'Editar Proveedores' } },
  { path: 'Listar-Proveedores', component: ListarProveedoresComponent, data: { breadcrumb: 'Listar Proveedores' } },
  { path: 'Stock-Min', component: StockMinComponent, data: { breadcrumb: 'Stock Minimo' } },
  { path: 'list-storage', component: ListStorageComponent, data: { breadcrumb: 'Almacen' } }, */

];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule
  ],
  declarations: [
    
  
   
  
    TiendasComponent,
                   TiendasDialogComponent,
                   SucursalesComponent,
                   SucursalesDialogComponent
  ]
})
export class TiendasSucursalesModule { }
