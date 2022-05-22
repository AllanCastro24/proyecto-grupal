import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router'; 
import { SharedModule } from '../../shared/shared.module';
import { ListComponent } from './list/list.component';
import { AddComponent } from './add/add.component';
import { CategoriasProductosComponent } from './categorias-productos/categorias-productos.component';
import { UnidadMedidaComponent } from './unidad-medida/unidad-medida.component';
import { CategoriaDialogProductosComponent } from './categorias-productos/categoria-dialog-productos/categoria-dialog-productos.component';
import { CategoriaDialogMedidaComponent } from './unidad-medida/categoria-dialog-medida/categoria-dialog-medida.component';
import { TipoPagoComponent } from './tipo-pago/tipo-pago.component';
import { ModalTipoPagoComponent } from './tipo-pago/modal-tipo-pago/modal-tipo-pago.component';
import { MermasComponent } from './mermas/mermas.component';
import { ModalMermasComponent } from './mermas/modal-mermas/modal-mermas.component';
import { AddProveedorComponent } from './add-proveedor/add-proveedor.component';
import { ListarProveedoresComponent } from './listar-proveedores/listar-proveedores.component';
import { StockMinComponent } from './stock-min/stock-min.component';
import { ModalStockComponent } from './stock-min/modal-stock/modal-stock.component';
import { ListStorageComponent } from './list-storage/list-storage.component';

export const routes = [ 
  { path: '', redirectTo: 'list-storage', pathMatch: 'full'},
  { path: 'list', component: ListComponent, data: { breadcrumb: 'Listar Insumos' } },
  { path: 'add', component: AddComponent, data: { breadcrumb: 'Add Insumos' } },
  { path: 'add/:id', component: AddComponent, data: { breadcrumb: 'Editar Productos' } }, 
  { path: 'unidad-medida', component: UnidadMedidaComponent, data: { breadcrumb: 'Unidad de Medida' } }, 
  { path: 'categorias-productos', component: CategoriasProductosComponent, data: { breadcrumb: 'Precio Venta' } },
  { path: 'Tipo-Pago', component: TipoPagoComponent, data: { breadcrumb: 'Tipo de Pago' } },
  { path: 'Mermas', component: MermasComponent, data: { breadcrumb: 'Mermas' } },
  { path: 'Add-Proveedor', component: AddProveedorComponent, data: { breadcrumb: 'Agregar Proveedores' } },
  { path: 'Add-Proveedor/:id', component: AddProveedorComponent, data: { breadcrumb: 'Editar Proveedores' } },
  { path: 'Listar-Proveedores', component: ListarProveedoresComponent, data: { breadcrumb: 'Listar Proveedores' } },
  { path: 'Stock-Min', component: StockMinComponent, data: { breadcrumb: 'Stock Minimo' } },
  { path: 'list-storage', component: ListStorageComponent, data: { breadcrumb: 'Almacen' } },
  
];

@NgModule({
  declarations: [
    ListComponent, 
    AddComponent, CategoriasProductosComponent, UnidadMedidaComponent, 
    CategoriaDialogProductosComponent, CategoriaDialogMedidaComponent, 
    TipoPagoComponent, ModalTipoPagoComponent, MermasComponent, ModalMermasComponent, 
    AddProveedorComponent, ListarProveedoresComponent, StockMinComponent, ModalStockComponent, ListStorageComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule
  ]
})
export class ProductsItemsModule { }
