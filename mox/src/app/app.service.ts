import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { Observable } from 'rxjs';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';

import { MenuItem, Order, Category, Unidades, Tiendas, Sucursales, Horario } from 'src/app/app.models';
import { AppSettings } from 'src/app/app.settings';
import { environment } from 'src/environments/environment';
import { ConfirmDialogComponent, ConfirmDialogModel } from './shared/confirm-dialog/confirm-dialog.component';
import { AlertDialogComponent } from './shared/alert-dialog/alert-dialog.component';
import { map } from 'rxjs/operators';

export class Data {

  constructor(public categories: Category[],
    public cartList: MenuItem[],
    public orderList: Order[],
    public favorites: MenuItem[],
    public unidades: Unidades[],
    public horario: Horario[],
    public tiendas: Tiendas[],
    public totalPrice: number,
    public totalCartCount: number,

  ) { }
}

@Injectable({
  providedIn: 'root'
})
export class AppService {
  public Data = new Data(
    [],  // categories 
    [],  // cartList
    [],  // orderList
    [],// favorites 
    [],  //unidades
    [],  //tiendas
    [],  //Horario
    0, // totalPrice
    0 //totalCartCount
  )


  API: string = 'http://localhost:8888/';
  public url = environment.url + '/assets/data/';
  public url2 = environment.url + 'http://localhost:8888/';
  //public url3 = environment.url + 'http://localhost/Slim/slim2/'; 
  public URL = "http://localhost/Angular/";

  public url3 = environment.url + 'http://localhost:8888/';
  //public url3 = environment.url + 'http://localhost/api/';

  constructor(public http: HttpClient,
    private datePipe: DatePipe,
    private bottomSheet: MatBottomSheet,
    private snackBar: MatSnackBar,
    public dialog: MatDialog,
    public appSettings: AppSettings,
    public translateService: TranslateService) { }


  //======================================= CATEGORIAS ==========================================

  GetCategoriass() {
    return this.http.get(this.url3 + 'GetCategoria');
  }

  CreateCategoria(Categoria: any): Observable<any> {
    let params = JSON.stringify(Categoria);
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post(this.url3 + 'InsertarCategoria', params, { headers: headers });
  }

  UpdateCategoria(id: any, datosEvent: any): Observable<any> {
    return this.http.put(this.url3 + "ActualizarCategoria/" + id, datosEvent);
  }

  DeleteCategoria(id: any): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.delete(this.url3 + "DeleteCategoria/" + id, { headers: headers });
  }
  //=================================================================================

  //======================================= TIPO DE PAGO ==========================================
  GetTipo_Pago() {
    return this.http.get(this.url3 + 'GetTipo_Pago');
  }

  InsertarTipo_Pago(pago: any): Observable<any> {
    let params = JSON.stringify(pago);
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post(this.url3 + 'InsertarTipo_Pago', params, { headers: headers });
  }

  UpdateTipo_Pago(id: any, pago: any): Observable<any> {
    return this.http.put(this.url3 + "ActualizarTipo_Pago/" + id, pago);
  }

  DeleteTipo_Pago(id: any): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.delete(this.url3 + "DeleteTipo_Pago/" + id, { headers: headers });
  }

  //===================================================================================================

  //======================================= UNIDAD DE MEDIDA ==========================================
  GetUnidad_Medida() {
    return this.http.get(this.url3 + 'GetUnidad-Medida');
  }

  InsertarUnidadMedida(UnidadMedida: any): Observable<any> {
    let params = JSON.stringify(UnidadMedida);
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post(this.url3 + 'Insertar-Unidad-Medida', params, { headers: headers });
  }

  UpdateUnidadMedida(id: any, UnidadMedida: any): Observable<any> {
    return this.http.put(this.url3 + "Actualizar-Unidad-Medida/" + id, UnidadMedida);
  }

  Delete_Unidad_Medida(id: any): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.delete(this.url3 + "Delete_Unidad_Medida/" + id, { headers: headers });
  }

  //===================================================================================================

  //======================================= UNIDAD DE MEDIDA ==========================================
  InsertarProveedor(Proveedor: any): Observable<any> {
    let params = JSON.stringify(Proveedor);
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post(this.url3 + 'InsertarProveedor', params, { headers: headers });
  }
  ActualizarProveedor(id: any, Proveedor: any): Observable<any> {
    return this.http.put(this.url3 + "ActualizarProveedor/" + id, Proveedor);
  }
  GetProveedor() {
    return this.http.get(this.url3 + 'GetProveedor');
  }
  ActualizarEstatusProveedor(id: any, Proveedor: any): Observable<any> {
    return this.http.put(this.url3 + "ActualizarEstatusProveedor/" + id, Proveedor);
  }
  GetProveedorByID(id: any) {
    return this.http.get(this.url3 + 'GetProveedor/' + id);
  }


  GetLastInsumo() {
    return this.http.get(this.url3 + 'GetLastInsumo');
  }


  GetinsumosYDetalle() {
    return this.http.get(this.url3 + 'GetinsumosYDetalle');
  }

  GetinsumosYDetalleID(id: any) {
    return this.http.get(this.url3 + 'GetinsumosYDetalleID/' + id);
  }


  InsertarInsumo(insumo: any): Observable<any> {
    let params = JSON.stringify(insumo);
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post(this.url3 + 'InsertarInsumo', params, { headers: headers });
  }

  InsertarDetalleInsumo(insumo: any): Observable<any> {
    let params = JSON.stringify(insumo);
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post(this.url3 + 'InsertarDetalleInsumo', params, { headers: headers });
  }

  ActualizarInsumo(id: any, insumo: any): Observable<any> {
    return this.http.put(this.url3 + "ActualizarInsumo/" + id, insumo);
  }

  ActualizarDetalleInsumo(id: any, insumo: any): Observable<any> {
    return this.http.put(this.url3 + "ActualizarDetalleInsumo/" + id, insumo);
  }

  subirarchivoimagenes(archivo: {}) {
    return this.http.post(this.url3 + 'subirimagen', archivo);
  }

  GetMermaCom() {
    return this.http.get(this.url3 + 'GetMermaCom');
  }

  GetInsumoCompuesto() {
    return this.http.get(this.url3 + 'GetInsumoCompuesto');
  }

  Get_Stock_Minimo() {
    return this.http.get(this.url3 + 'Get_Stock_Minimo');
  }
  GetAlmacenCompuesto() {
    return this.http.get(this.url3 + 'GetAlmacenCompuesto');
  }

  InsertarMerma(merma: any): Observable<any> {
    let params = JSON.stringify(merma);
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post(this.url3 + 'InsertarMerma', params, { headers: headers });
  }


  ActualizarMerma(id: any, merma: any): Observable<any> {
    return this.http.put(this.url3 + "ActualizarMerma/" + id, merma);
  }

  ActualizarStockMinimo(id: any, sm: any): Observable<any> {
    return this.http.put(this.url3 + "ActualizarStockMinimo/" + id, sm);
  }


  //=================================================================================



  public getMenuItems(): Observable<MenuItem[]> {
    return this.http.get<MenuItem[]>(this.url2 + 'cus');
  }
  public getMenuItemssuc(id: any, idsuc: any): Observable<MenuItem[]> {
    return this.http.get<MenuItem[]>(this.url2 + 'suc/' + id + '/' + idsuc);
  }
  public getMenuItemssucalta(id: any, idsuc: any): Observable<MenuItem[]> {
    return this.http.get<MenuItem[]>(this.url2 + 'succ/' + id + '/' + idsuc);
  }

  insertarplatos(idtienda: any, idsucursal: any, datoss: any) {
    return this.http.post(this.url2 + 'addplatillos/' + idtienda + '/' + idsucursal, datoss);
  }
  update(idtienda: any, idsucursal: any, id: number, datoss: any) {
    return this.http.put(this.url2 + 'mod/' + idtienda + '/' + idsucursal + '/' + id, datoss);
  }
  updateespedi(datoss: any) {
    return this.http.put(this.url2 + 'modpedido', datoss);
  }
  bajaplato(idtienda: any, idsucursal: any, id: number, datoss: any) {
    return this.http.put(this.url2 + 'baja/' + idtienda + '/' + idsucursal + '/' + id, datoss);
  }
  bajaplato2(idtienda: any, idsucursal: any, id: any, datoss: any) {
    return this.http.put(this.url2 + 'baja/' + idtienda + '/' + idsucursal + '/' + id, datoss);
  }
  bajaplato3(idtienda: any, idsucursal: any, id: any, Proveedor: any): Observable<any> {
    return this.http.put(this.url2 + 'baja/' + idtienda + '/' + idsucursal + '/' + id, Proveedor);
  }
  bajaoaltacatmenu(idtienda: any, idsucursal: any, id: any, catmenu: any): Observable<any> {
    return this.http.put(this.url2 + 'bajacatmenu/' + id + '/' + idtienda + '/' + idsucursal, catmenu);
  }

  bajaoaltasucursal(id: any, catmenu: any): Observable<any> {
    return this.http.put(this.url2 + 'bajasucursal/' + id, catmenu);
  }
  insertarpedido(datoss: any) {
    return this.http.post(this.url2 + 'addpedidos', datoss);
  }
  insertarpedidocomi(datoss: any) {
    return this.http.post(this.url2 + 'addpedidoscomi', datoss);
  }
  subirarchivoimg(archivo: {}) {
    return this.http.post(this.url2 + 'subirimg', archivo);
  }

  enviarcorreo(archivo: any) {
    return this.http.post(this.url2 + 'enviar', archivo);
  }

  editUser(user: any): Observable<any> {
    return this.http.post(this.url2 + 'cuse/', user);
  }


  public getProveedores(): Observable<MenuItem[]> {
    return this.http.get<MenuItem[]>(this.url + 'proveedores.json');
  }

  public getStockMin(): Observable<MenuItem[]> {
    return this.http.get<MenuItem[]>(this.url + 'stock-min.json');
  }

  public getMenuItemById(id: number): Observable<MenuItem> {
    return this.http.get<MenuItem>(this.url2 + 'cuse/' + id);
  }

  public getSpecialMenuItems(): Observable<MenuItem[]> {
    return this.http.get<MenuItem[]>(this.url + 'special-menu-items.json');
  }


  public getBestMenuItems(): Observable<MenuItem[]> {
    return this.http.get<MenuItem[]>(this.url + 'best-menu-items.json');
  }

  public gettiendas(): Observable<Tiendas[]> {
    return this.http.get<Tiendas[]>(this.url2 + 'tiendasaltabaja');
  }

  public gethorarios(): Observable<Horario[]> {
    return this.http.get<Horario[]>(this.url2 + 'horariossuc');
  }

  public getsucursales(): Observable<Sucursales[]> {
    return this.http.get<Sucursales[]>(this.url2 + 'sucursalaltabaja');
  }

  public getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(this.url2 + 'categoriasmenu');
  }

  public getCategoriestiendasuc(idtienda: any, idsucursal: any): Observable<Category[]> {
    return this.http.get<Category[]>(this.url2 + 'categoriasmenusuctienda/' + idtienda + '/' + idsucursal);
  }

  public getiendas(): Observable<Tiendas[]> {
    return this.http.get<Tiendas[]>(this.url2 + 'tiendasaltabaja');
  }

  public getCategoriesab(idtienda: any, idsucursal: any): Observable<Category[]> {
    return this.http.get<Category[]>(this.url2 + 'categoriasmenualtabaja/' + idtienda + '/' + idsucursal);
  }

  insertartienda(datoss: any) {
    return this.http.post(this.url2 + 'addtienda', datoss);
  }

  insertarsucursal(datoss: any) {
    return this.http.post(this.url2 + 'addsucursal', datoss);
  }

  insertarcateogoriasmenu(idtienda: any, idsucursal: any, datoss: any) {
    return this.http.post(this.url2 + 'addcategoriasmenu/' + idtienda + '/' + idsucursal, datoss);
  }

  editcateogoriasmenu(id: number, datoss: any) {
    return this.http.put(this.url2 + 'editcategoriasmenu/' + id, datoss);
  }

  edittienda(id: number, datoss: any) {
    return this.http.put(this.url2 + 'edittiendas/' + id, datoss);
  }

  editsucursal(idtienda: number, idsucursal: number, datoss: any) {
    return this.http.put(this.url2 + 'editsucursal/' + idtienda + '/' + idsucursal, datoss);
  }


  public getUnidadespla(): Observable<Unidades[]> {
    return this.http.get<Unidades[]>(this.url + 'unidades.json');
  }
  public getCategoriesProductos(): Observable<Category[]> {
    return this.http.get<Category[]>(this.url + 'categoriesProductos.json');
  }

  public getTipoPago(): Observable<Category[]> {
    return this.http.get<Category[]>(this.url + 'TipoPago.json');
  }

  public getMerma(): Observable<Category[]> {
    return this.http.get<Category[]>(this.url + 'Mermas.json');
  }

  public getCategoriesUnidadMedida(): Observable<Category[]> {
    return this.http.get<Category[]>(this.url + 'unidadMedida.json');
  }

  public precioventa(): Observable<Category[]> {
    return this.http.get<Category[]>(this.url + 'precioventa.json');
  }

  public getHomeCarouselSlides() {
    return this.http.get<any[]>(this.url + 'slides.json');
  }

  public getReservations() {
    return this.http.get<any[]>(this.url + 'reservations.json');
  }


  public getOrderss(idtienda: any, idsucursal: any) {
    return this.http.get<any[]>(this.url2 + 'mostpedidos/' + idtienda + '/' + idsucursal);
  }

  public getOrders() {
    return this.http.get<any[]>(this.url2);
  }

  public getOrderscomple(idtienda: any, idsucursal: any) {
    return this.http.get<any[]>(this.url2 + 'mostpedidoscomple/' + idtienda + '/' + idsucursal);
  }

  public getOrderscomple2(idtienda: any, idsucursal: any, id: any) {
    return this.http.get<any[]>(this.url2 + 'mostpedidoscompletick/' + idtienda + '/' + idsucursal + '/' + id);
  }



  public mostrartiesuc() {
    return this.http.get<any[]>(this.url2 + 'mostrartiesuc');
  }
  public getGUID() {
    let guid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    }).toLowerCase();
    return guid;
  }

  public addToCart(menuItem: MenuItem, component: any) {
    if (!this.Data.cartList.find(item => item.id == menuItem.id)) {
      menuItem.cartCount = (menuItem.cartCount) ? menuItem.cartCount : 1;
      this.Data.cartList.push(menuItem);
      this.calculateCartTotal();
      if (component) {
        this.openCart(component);
      }
      else {
        this.snackBar.open('The menu item "' + menuItem.name + '" has been added to cart.', '×', {
          verticalPosition: 'top',
          duration: 3000,
          direction: (this.appSettings.settings.rtl) ? 'rtl' : 'ltr',
          panelClass: ['success']
        });
      }
    }
  }

  public openCart(component: any) {
    this.bottomSheet.open(component, {
      direction: (this.appSettings.settings.rtl) ? 'rtl' : 'ltr'
    }).afterDismissed().subscribe(isRedirect => {
      if (isRedirect) {
        window.scrollTo(0, 0);
      }
    });
  }

  public calculateCartTotal() {
    this.Data.totalPrice = 0;
    this.Data.totalCartCount = 0;
    this.Data.cartList.forEach(item => {
      let price = 0;
      if (item.discount) {
        price = item.price - (item.price * (item.discount / 100));
      }
      else {
        price = item.price;
      }
      this.Data.totalPrice = this.Data.totalPrice + (price * item.cartCount);
      this.Data.totalCartCount = this.Data.totalCartCount + item.cartCount;
    });
  }

  public addToFavorites(menuItem: MenuItem) {
    let message: string, status: string;
    if (this.Data.favorites.find(item => item.id == menuItem.id)) {
      message = 'The menu item "' + menuItem.name + '" already added to favorites.';
      status = 'error';
    }
    else {
      this.Data.favorites.push(menuItem);
      message = 'The menu item "' + menuItem.name + '" has been added to favorites.';
      status = 'success';
    }
    this.snackBar.open(message, '×', {
      verticalPosition: 'top',
      duration: 3000,
      direction: (this.appSettings.settings.rtl) ? 'rtl' : 'ltr',
      panelClass: [status]
    });
  }

  public openDialog(component: any, data: any, panelClass: any) {
    return this.dialog.open(component, {
      data: data,
      panelClass: panelClass,
      autoFocus: false,
      direction: (this.appSettings.settings.rtl) ? 'rtl' : 'ltr'
    });
  }


  public openDialog2(component: any, data: any, panelClass: any, idtienda: any, idsucursal: any) {
    return this.dialog.open(component, {
      data: data,
      panelClass: panelClass,
      autoFocus: false,
      direction: (this.appSettings.settings.rtl) ? 'rtl' : 'ltr'
    });
  }

  public openConfirmDialog(title: string, message: string) {
    const dialogData = new ConfirmDialogModel(title, message);
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: "400px",
      data: dialogData
    });
    return dialogRef;
  }

  public openAlertDialog(message: string) {
    const dialogRef = this.dialog.open(AlertDialogComponent, {
      maxWidth: "400px",
      data: message
    });
    return dialogRef;
  }

  public makeReservation(dialogComponent: any, data: any, onDialog: boolean = false) {
    if (onDialog) {
      const dialogRef = this.openDialog(dialogComponent, null, 'theme-dialog');
      dialogRef.afterClosed().subscribe(data => {
        if (data) {
          this.showReservationMessage(data);
        }
      });
    }
    else {
      this.showReservationMessage(data);
    }
  }
  private showReservationMessage(data: any) {
    this.snackBar.open('Dear ' + data.fullName + ', thank you for your reservation! Your reservation at Popino on the ' + this.datePipe.transform(data.date, 'dd-MM-yyyy') + ' at ' + data.time + ' for ' + data.guests + ' people will review by our team and someone will be in touch soon.', '×', { panelClass: 'success', verticalPosition: 'top', duration: 9000 });
  }

  public getTranslateValue(key: string, param: string = '') {
    let value = null;
    this.translateService.get(key, { param: param }).subscribe((res: string) => {
      value = res;
    })
    return value;
  }

  public filterData(data: any, categoryId: number, sort?: string, page?: number, perPage?: number) {
    if (categoryId) {
      data = data.filter((item: any) => item.categoryId == categoryId);
    }

    //for show more properties mock data 
    // for (var index = 0; index < 2; index++) {
    //   data = data.concat(data);        
    // }     

    this.sortData(sort, data);
    return this.paginator(data, page, perPage)
  }

  public sortData(sort?: string, data?: any) {
    if (sort) {
      switch (sort) {
        case 'Popular':
          data = data.sort((a: any, b: any) => {
            if (a.ratingsValue / a.ratingsCount < b.ratingsValue / b.ratingsCount) {
              return 1;
            }
            if (a.ratingsValue / a.ratingsCount > b.ratingsValue / b.ratingsCount) {
              return -1;
            }
            return 0;
          });
          break;
        case 'Price (Low to High)':
          data = data.sort((a: any, b: any) => {
            if (a.price > b.price) {
              return 1;
            }
            if (a.price < b.price) {
              return -1;
            }
            return 0;
          });
          break;
        case 'Price (High to Low)':
          data = data.sort((a: any, b: any) => {
            if (a.price < b.price) {
              return 1;
            }
            if (a.price > b.price) {
              return -1;
            }
            return 0;
          });
          break;
        default:
          break;
      }
    }
    return data;
  }

  public paginator(items: any, page?: any, perPage?: any) {
    var page = page || 1,
      perPage = perPage || 4,
      offset = (page - 1) * perPage,
      paginatedItems = items.slice(offset).slice(0, perPage),
      totalPages = Math.ceil(items.length / perPage);
    return {
      data: paginatedItems,
      pagination: {
        page: page,
        perPage: perPage,
        prePage: page - 1 ? page - 1 : null,
        nextPage: (totalPages > page) ? page + 1 : null,
        total: items.length,
        totalPages: totalPages,
      }
    };
  }

  public getCountries() {
    return [
      { name: 'Afghanistan', code: 'AF' },
      { name: 'Aland Islands', code: 'AX' },
      { name: 'Albania', code: 'AL' },
      { name: 'Algeria', code: 'DZ' },
      { name: 'American Samoa', code: 'AS' },
      { name: 'AndorrA', code: 'AD' },
      { name: 'Angola', code: 'AO' },
      { name: 'Anguilla', code: 'AI' },
      { name: 'Antarctica', code: 'AQ' },
      { name: 'Antigua and Barbuda', code: 'AG' },
      { name: 'Argentina', code: 'AR' },
      { name: 'Armenia', code: 'AM' },
      { name: 'Aruba', code: 'AW' },
      { name: 'Australia', code: 'AU' },
      { name: 'Austria', code: 'AT' },
      { name: 'Azerbaijan', code: 'AZ' },
      { name: 'Bahamas', code: 'BS' },
      { name: 'Bahrain', code: 'BH' },
      { name: 'Bangladesh', code: 'BD' },
      { name: 'Barbados', code: 'BB' },
      { name: 'Belarus', code: 'BY' },
      { name: 'Belgium', code: 'BE' },
      { name: 'Belize', code: 'BZ' },
      { name: 'Benin', code: 'BJ' },
      { name: 'Bermuda', code: 'BM' },
      { name: 'Bhutan', code: 'BT' },
      { name: 'Bolivia', code: 'BO' },
      { name: 'Bosnia and Herzegovina', code: 'BA' },
      { name: 'Botswana', code: 'BW' },
      { name: 'Bouvet Island', code: 'BV' },
      { name: 'Brazil', code: 'BR' },
      { name: 'British Indian Ocean Territory', code: 'IO' },
      { name: 'Brunei Darussalam', code: 'BN' },
      { name: 'Bulgaria', code: 'BG' },
      { name: 'Burkina Faso', code: 'BF' },
      { name: 'Burundi', code: 'BI' },
      { name: 'Cambodia', code: 'KH' },
      { name: 'Cameroon', code: 'CM' },
      { name: 'Canada', code: 'CA' },
      { name: 'Cape Verde', code: 'CV' },
      { name: 'Cayman Islands', code: 'KY' },
      { name: 'Central African Republic', code: 'CF' },
      { name: 'Chad', code: 'TD' },
      { name: 'Chile', code: 'CL' },
      { name: 'China', code: 'CN' },
      { name: 'Christmas Island', code: 'CX' },
      { name: 'Cocos (Keeling) Islands', code: 'CC' },
      { name: 'Colombia', code: 'CO' },
      { name: 'Comoros', code: 'KM' },
      { name: 'Congo', code: 'CG' },
      { name: 'Congo, The Democratic Republic of the', code: 'CD' },
      { name: 'Cook Islands', code: 'CK' },
      { name: 'Costa Rica', code: 'CR' },
      { name: 'Cote D\'Ivoire', code: 'CI' },
      { name: 'Croatia', code: 'HR' },
      { name: 'Cuba', code: 'CU' },
      { name: 'Cyprus', code: 'CY' },
      { name: 'Czech Republic', code: 'CZ' },
      { name: 'Denmark', code: 'DK' },
      { name: 'Djibouti', code: 'DJ' },
      { name: 'Dominica', code: 'DM' },
      { name: 'Dominican Republic', code: 'DO' },
      { name: 'Ecuador', code: 'EC' },
      { name: 'Egypt', code: 'EG' },
      { name: 'El Salvador', code: 'SV' },
      { name: 'Equatorial Guinea', code: 'GQ' },
      { name: 'Eritrea', code: 'ER' },
      { name: 'Estonia', code: 'EE' },
      { name: 'Ethiopia', code: 'ET' },
      { name: 'Falkland Islands (Malvinas)', code: 'FK' },
      { name: 'Faroe Islands', code: 'FO' },
      { name: 'Fiji', code: 'FJ' },
      { name: 'Finland', code: 'FI' },
      { name: 'France', code: 'FR' },
      { name: 'French Guiana', code: 'GF' },
      { name: 'French Polynesia', code: 'PF' },
      { name: 'French Southern Territories', code: 'TF' },
      { name: 'Gabon', code: 'GA' },
      { name: 'Gambia', code: 'GM' },
      { name: 'Georgia', code: 'GE' },
      { name: 'Germany', code: 'DE' },
      { name: 'Ghana', code: 'GH' },
      { name: 'Gibraltar', code: 'GI' },
      { name: 'Greece', code: 'GR' },
      { name: 'Greenland', code: 'GL' },
      { name: 'Grenada', code: 'GD' },
      { name: 'Guadeloupe', code: 'GP' },
      { name: 'Guam', code: 'GU' },
      { name: 'Guatemala', code: 'GT' },
      { name: 'Guernsey', code: 'GG' },
      { name: 'Guinea', code: 'GN' },
      { name: 'Guinea-Bissau', code: 'GW' },
      { name: 'Guyana', code: 'GY' },
      { name: 'Haiti', code: 'HT' },
      { name: 'Heard Island and Mcdonald Islands', code: 'HM' },
      { name: 'Holy See (Vatican City State)', code: 'VA' },
      { name: 'Honduras', code: 'HN' },
      { name: 'Hong Kong', code: 'HK' },
      { name: 'Hungary', code: 'HU' },
      { name: 'Iceland', code: 'IS' },
      { name: 'India', code: 'IN' },
      { name: 'Indonesia', code: 'ID' },
      { name: 'Iran, Islamic Republic Of', code: 'IR' },
      { name: 'Iraq', code: 'IQ' },
      { name: 'Ireland', code: 'IE' },
      { name: 'Isle of Man', code: 'IM' },
      { name: 'Israel', code: 'IL' },
      { name: 'Italy', code: 'IT' },
      { name: 'Jamaica', code: 'JM' },
      { name: 'Japan', code: 'JP' },
      { name: 'Jersey', code: 'JE' },
      { name: 'Jordan', code: 'JO' },
      { name: 'Kazakhstan', code: 'KZ' },
      { name: 'Kenya', code: 'KE' },
      { name: 'Kiribati', code: 'KI' },
      { name: 'Korea, Democratic People\'S Republic of', code: 'KP' },
      { name: 'Korea, Republic of', code: 'KR' },
      { name: 'Kuwait', code: 'KW' },
      { name: 'Kyrgyzstan', code: 'KG' },
      { name: 'Lao People\'S Democratic Republic', code: 'LA' },
      { name: 'Latvia', code: 'LV' },
      { name: 'Lebanon', code: 'LB' },
      { name: 'Lesotho', code: 'LS' },
      { name: 'Liberia', code: 'LR' },
      { name: 'Libyan Arab Jamahiriya', code: 'LY' },
      { name: 'Liechtenstein', code: 'LI' },
      { name: 'Lithuania', code: 'LT' },
      { name: 'Luxembourg', code: 'LU' },
      { name: 'Macao', code: 'MO' },
      { name: 'Macedonia, The Former Yugoslav Republic of', code: 'MK' },
      { name: 'Madagascar', code: 'MG' },
      { name: 'Malawi', code: 'MW' },
      { name: 'Malaysia', code: 'MY' },
      { name: 'Maldives', code: 'MV' },
      { name: 'Mali', code: 'ML' },
      { name: 'Malta', code: 'MT' },
      { name: 'Marshall Islands', code: 'MH' },
      { name: 'Martinique', code: 'MQ' },
      { name: 'Mauritania', code: 'MR' },
      { name: 'Mauritius', code: 'MU' },
      { name: 'Mayotte', code: 'YT' },
      { name: 'Mexico', code: 'MX' },
      { name: 'Micronesia, Federated States of', code: 'FM' },
      { name: 'Moldova, Republic of', code: 'MD' },
      { name: 'Monaco', code: 'MC' },
      { name: 'Mongolia', code: 'MN' },
      { name: 'Montserrat', code: 'MS' },
      { name: 'Morocco', code: 'MA' },
      { name: 'Mozambique', code: 'MZ' },
      { name: 'Myanmar', code: 'MM' },
      { name: 'Namibia', code: 'NA' },
      { name: 'Nauru', code: 'NR' },
      { name: 'Nepal', code: 'NP' },
      { name: 'Netherlands', code: 'NL' },
      { name: 'Netherlands Antilles', code: 'AN' },
      { name: 'New Caledonia', code: 'NC' },
      { name: 'New Zealand', code: 'NZ' },
      { name: 'Nicaragua', code: 'NI' },
      { name: 'Niger', code: 'NE' },
      { name: 'Nigeria', code: 'NG' },
      { name: 'Niue', code: 'NU' },
      { name: 'Norfolk Island', code: 'NF' },
      { name: 'Northern Mariana Islands', code: 'MP' },
      { name: 'Norway', code: 'NO' },
      { name: 'Oman', code: 'OM' },
      { name: 'Pakistan', code: 'PK' },
      { name: 'Palau', code: 'PW' },
      { name: 'Palestinian Territory, Occupied', code: 'PS' },
      { name: 'Panama', code: 'PA' },
      { name: 'Papua New Guinea', code: 'PG' },
      { name: 'Paraguay', code: 'PY' },
      { name: 'Peru', code: 'PE' },
      { name: 'Philippines', code: 'PH' },
      { name: 'Pitcairn', code: 'PN' },
      { name: 'Poland', code: 'PL' },
      { name: 'Portugal', code: 'PT' },
      { name: 'Puerto Rico', code: 'PR' },
      { name: 'Qatar', code: 'QA' },
      { name: 'Reunion', code: 'RE' },
      { name: 'Romania', code: 'RO' },
      { name: 'Russian Federation', code: 'RU' },
      { name: 'RWANDA', code: 'RW' },
      { name: 'Saint Helena', code: 'SH' },
      { name: 'Saint Kitts and Nevis', code: 'KN' },
      { name: 'Saint Lucia', code: 'LC' },
      { name: 'Saint Pierre and Miquelon', code: 'PM' },
      { name: 'Saint Vincent and the Grenadines', code: 'VC' },
      { name: 'Samoa', code: 'WS' },
      { name: 'San Marino', code: 'SM' },
      { name: 'Sao Tome and Principe', code: 'ST' },
      { name: 'Saudi Arabia', code: 'SA' },
      { name: 'Senegal', code: 'SN' },
      { name: 'Serbia and Montenegro', code: 'CS' },
      { name: 'Seychelles', code: 'SC' },
      { name: 'Sierra Leone', code: 'SL' },
      { name: 'Singapore', code: 'SG' },
      { name: 'Slovakia', code: 'SK' },
      { name: 'Slovenia', code: 'SI' },
      { name: 'Solomon Islands', code: 'SB' },
      { name: 'Somalia', code: 'SO' },
      { name: 'South Africa', code: 'ZA' },
      { name: 'South Georgia and the South Sandwich Islands', code: 'GS' },
      { name: 'Spain', code: 'ES' },
      { name: 'Sri Lanka', code: 'LK' },
      { name: 'Sudan', code: 'SD' },
      { name: 'Suriname', code: 'SR' },
      { name: 'Svalbard and Jan Mayen', code: 'SJ' },
      { name: 'Swaziland', code: 'SZ' },
      { name: 'Sweden', code: 'SE' },
      { name: 'Switzerland', code: 'CH' },
      { name: 'Syrian Arab Republic', code: 'SY' },
      { name: 'Taiwan, Province of China', code: 'TW' },
      { name: 'Tajikistan', code: 'TJ' },
      { name: 'Tanzania, United Republic of', code: 'TZ' },
      { name: 'Thailand', code: 'TH' },
      { name: 'Timor-Leste', code: 'TL' },
      { name: 'Togo', code: 'TG' },
      { name: 'Tokelau', code: 'TK' },
      { name: 'Tonga', code: 'TO' },
      { name: 'Trinidad and Tobago', code: 'TT' },
      { name: 'Tunisia', code: 'TN' },
      { name: 'Turkey', code: 'TR' },
      { name: 'Turkmenistan', code: 'TM' },
      { name: 'Turks and Caicos Islands', code: 'TC' },
      { name: 'Tuvalu', code: 'TV' },
      { name: 'Uganda', code: 'UG' },
      { name: 'Ukraine', code: 'UA' },
      { name: 'United Arab Emirates', code: 'AE' },
      { name: 'United Kingdom', code: 'GB' },
      { name: 'United States', code: 'US' },
      { name: 'United States Minor Outlying Islands', code: 'UM' },
      { name: 'Uruguay', code: 'UY' },
      { name: 'Uzbekistan', code: 'UZ' },
      { name: 'Vanuatu', code: 'VU' },
      { name: 'Venezuela', code: 'VE' },
      { name: 'Viet Nam', code: 'VN' },
      { name: 'Virgin Islands, British', code: 'VG' },
      { name: 'Virgin Islands, U.S.', code: 'VI' },
      { name: 'Wallis and Futuna', code: 'WF' },
      { name: 'Western Sahara', code: 'EH' },
      { name: 'Yemen', code: 'YE' },
      { name: 'Zambia', code: 'ZM' },
      { name: 'Zimbabwe', code: 'ZW' }
    ]
  }

  public getTestimonials() {
    return [
      {
        text: 'Donec molestie turpis ut mollis efficitur. Nam fringilla libero vel dictum vulputate. In malesuada, ligula non ornare consequat, augue nibh luctus nisl, et lobortis justo ipsum nec velit. Praesent lacinia quam ut nulla gravida, at viverra libero euismod. Sed tincidunt tempus augue vitae malesuada. Vestibulum eu lectus nisi. Aliquam erat volutpat.',
        author: 'Mr. Adam Sandler',
        position: 'General Director',
        image: 'assets/images/profile/adam.jpg'
      },
      {
        text: 'Donec molestie turpis ut mollis efficitur. Nam fringilla libero vel dictum vulputate. In malesuada, ligula non ornare consequat, augue nibh luctus nisl, et lobortis justo ipsum nec velit. Praesent lacinia quam ut nulla gravida, at viverra libero euismod. Sed tincidunt tempus augue vitae malesuada. Vestibulum eu lectus nisi. Aliquam erat volutpat.',
        author: 'Ashley Ahlberg',
        position: 'Housewife',
        image: 'assets/images/profile/ashley.jpg'
      },
      {
        text: 'Donec molestie turpis ut mollis efficitur. Nam fringilla libero vel dictum vulputate. In malesuada, ligula non ornare consequat, augue nibh luctus nisl, et lobortis justo ipsum nec velit. Praesent lacinia quam ut nulla gravida, at viverra libero euismod. Sed tincidunt tempus augue vitae malesuada. Vestibulum eu lectus nisi. Aliquam erat volutpat.',
        author: 'Bruno Vespa',
        position: 'Blogger',
        image: 'assets/images/profile/bruno.jpg'
      },
      {
        text: 'Donec molestie turpis ut mollis efficitur. Nam fringilla libero vel dictum vulputate. In malesuada, ligula non ornare consequat, augue nibh luctus nisl, et lobortis justo ipsum nec velit. Praesent lacinia quam ut nulla gravida, at viverra libero euismod. Sed tincidunt tempus augue vitae malesuada. Vestibulum eu lectus nisi. Aliquam erat volutpat.',
        author: 'Mrs. Julia Aniston',
        position: 'Marketing Manager',
        image: 'assets/images/profile/julia.jpg'
      }
    ];
  }

  public getChefs() {
    return [
      {
        id: 1,
        fullName: 'Andy Warhol',
        position: 'Head of Chef',
        desc: 'Phasellus sed metus leo. Donec laoreet, lacus ut suscipit convallis, erat enim eleifend nulla, at sagittis enim urna et lacus.',
        organization: 'Restaurant',
        email: 'andy.w@mox.com',
        phone: '(212) 457-2308',
        social: {
          facebook: 'andy.warhol',
          twitter: 'andy.warhol',
          linkedin: 'andy.warhol',
          instagram: 'andy.warhol',
          website: 'https://andy.warhol.com'
        },
        ratingsCount: 4,
        ratingsValue: 400,
        image: 'assets/images/chefs/1.jpg'
      },
      {
        id: 2,
        fullName: 'Lusia Manuel',
        position: 'Assistant Chef',
        desc: 'Phasellus sed metus leo. Donec laoreet, lacus ut suscipit convallis, erat enim eleifend nulla, at sagittis enim urna et lacus.',
        organization: 'Restaurant',
        email: 'lusia.m@mox.com',
        phone: '(224) 267-1346',
        social: {
          facebook: 'lusia.manuel',
          twitter: 'lusia.manuel',
          linkedin: 'lusia.manuel',
          instagram: 'lusia.manuel',
          website: 'https://lusia.manuel.com'
        },
        ratingsCount: 6,
        ratingsValue: 480,
        image: 'assets/images/chefs/2.jpg'
      },
      {
        id: 3,
        fullName: 'Michael Blair',
        position: 'Intern Chef',
        desc: 'Phasellus sed metus leo. Donec laoreet, lacus ut suscipit convallis, erat enim eleifend nulla, at sagittis enim urna et lacus.',
        organization: 'Restaurant',
        email: 'michael.b@mox.com',
        phone: '(267) 388-1637',
        social: {
          facebook: 'michael.blair',
          twitter: 'michael.blair',
          linkedin: 'michael.blair',
          instagram: 'michael.blair',
          website: 'https://michael.blair.com'
        },
        ratingsCount: 4,
        ratingsValue: 400,
        image: 'assets/images/chefs/3.jpg'
      },
      {
        id: 4,
        fullName: 'Tereza Stiles',
        position: 'Assistant Chef',
        desc: 'Phasellus sed metus leo. Donec laoreet, lacus ut suscipit convallis, erat enim eleifend nulla, at sagittis enim urna et lacus.',
        organization: 'Restaurant',
        email: 'tereza.s@mox.com',
        phone: '(214) 617-2614',
        social: {
          facebook: 'tereza.stiles',
          twitter: 'tereza.stiles',
          linkedin: 'tereza.stiles',
          instagram: 'tereza.stiles',
          website: 'https://tereza.stiles.com'
        },
        ratingsCount: 4,
        ratingsValue: 380,
        image: 'assets/images/chefs/4.jpg'
      },
      {
        id: 5,
        fullName: 'Michelle Ormond',
        position: 'Head of Chef',
        desc: 'Phasellus sed metus leo. Donec laoreet, lacus ut suscipit convallis, erat enim eleifend nulla, at sagittis enim urna et lacus.',
        organization: 'Restaurant',
        email: 'michelle.o@mox.com',
        phone: '(267) 388-1637',
        social: {
          facebook: 'michelle.ormond',
          twitter: 'michelle.ormond',
          linkedin: 'michelle.ormond',
          instagram: 'michelle.ormond',
          website: 'https://michelle.ormond.com'
        },
        ratingsCount: 6,
        ratingsValue: 480,
        image: 'assets/images/chefs/5.jpg'
      }
    ];
  }

  public getAwards() {
    return [
      { name: 'award-1', image: 'assets/images/awards/1.png' },
      { name: 'award-2', image: 'assets/images/awards/2.png' },
      { name: 'award-3', image: 'assets/images/awards/3.png' },
      { name: 'award-4', image: 'assets/images/awards/4.png' },
      { name: 'award-5', image: 'assets/images/awards/5.png' },
      { name: 'award-6', image: 'assets/images/awards/6.png' },
      { name: 'award-7', image: 'assets/images/awards/7.png' }
    ];
  }

  public getDeliveryMethods() {
    return [

      { value: 'Normal', name: 'Envio Normal', desc: '$20 / Envio Normal' },

    ]
  }

  public getpaymentmethods() {
    return [

      { value: 'Efectivo', name: 'Pago Efectivo', desc: 'Solicite pago en efectivo' },
      { value: 'Tarjeta', name: 'Pago Con Tarjeta', desc: 'Ingrese tarjeta' },

    ]
  }

  public getMonths() {
    return [
      { value: '01', name: 'Enero' },
      { value: '02', name: 'Febrero' },
      { value: '03', name: 'Marzo' },
      { value: '04', name: 'Abril' },
      { value: '05', name: 'Mayo' },
      { value: '06', name: 'Junio' },
      { value: '07', name: 'Julio' },
      { value: '08', name: 'Agosto' },
      { value: '09', name: 'Septiembre' },
      { value: '10', name: 'Octubre' },
      { value: '11', name: 'Noviembre' },
      { value: '12', name: 'Diciembre' }
    ]
  }

  public getYears() {
    const startYear = new Date().getFullYear();
    let years = Array();
    for (let i = 0; i <= 10; i++) {
      years.push(startYear + i);
    }
    return years;
  }

  public shuffleArray(array: any) {
    var currentIndex = array.length, temporaryValue, randomIndex;
    while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
    return array;
  }

  public convertImgToBase64(url: string, callback: any) {
    var xhr = new XMLHttpRequest();
    xhr.onload = function () {
      var reader = new FileReader();
      reader.onloadend = function () {
        callback(reader.result);
      }
      reader.readAsDataURL(xhr.response);
    };
    xhr.open('GET', url);
    xhr.responseType = 'blob';
    xhr.send();
  }


  private mailApi = 'https://mailthis.to/codeninja'
  public PostMessage(input: any) {
    return this.http.post(this.mailApi, input, { responseType: 'text' })
      .pipe(
        map(
          (response: any) => {
            if (response) {
              return response;
            }
          },
          (error: any) => {
            return error;
          }
        )
      )
  }

  ObtenerGastosFijos(id_sucursal: any, id_tienda: any) {
    return this.http.get(this.API + "api/costos_fijos/consultar/" + id_sucursal + "/" + id_tienda);
  }

  InsertarGastoFijo(datosGasto: any): Observable<any> {
    return this.http.post(this.API + "api/costos_fijos/add", datosGasto, { responseType: 'text' });

  }

  EditarGastoFijo(id: any, datosGasto: any): Observable<any> {
    return this.http.put(this.API + "api/costos_fijos/update/" + id, datosGasto, { responseType: 'text' });

  }

  BajaGastoFijo(id: any, status: any): Observable<any> {
    return this.http.put(this.API + "api/costos_fijos/baja/" + id + "/" + status, { responseType: 'text' });

  }
  //GASTOS FIJOS PROGRAMADOS

  ObtenerGastosFijosProgramados(id_sucursal: any, id_tienda: any) {
    return this.http.get(this.API + "api/costos_programados/consultar/" + id_sucursal + "/" + id_tienda);
  }

  InsertarGastoFijoProgramado(datosGasto: any): Observable<any> {
    return this.http.post(this.API + "api/costos_programados/add", datosGasto, { responseType: 'text' });

  }

  EditarGastoFijoProgramado(id: any, datosGasto: any): Observable<any> {
    return this.http.put(this.API + "api/costos_programados/update/" + id, datosGasto, { responseType: 'text' });

  }

  BajaGastoFijoProgramado(id: any, status: any): Observable<any> {
    return this.http.put(this.API + "api/costos_programados/baja/" + id + "/" + status, { responseType: 'text' });

  }

  ObtenerTiposGastosFijos() {
    return this.http.get(this.API + "api/tipo_gastos/consultar");
  }

  ObtenerTiposGastosFijosActivos() {
    return this.http.get(this.API + "api/tipo_gastos/select");
  }

  ObtenerSucursales() {
    return this.http.get(this.API + "api/sucursales/consultar");
  }

  InsertarTipoGastoFijo(datosGasto: any): Observable<any> {
    return this.http.post(this.API + "api/tipo_gastos/add", datosGasto, { responseType: 'text' });

  }

  EditarTipoGastoFijo(id: any, datosGasto: any): Observable<any> {
    return this.http.put(this.API + "api/tipo_gastos/update/" + id, datosGasto, { responseType: 'text' });

  }

  BajaTipoGastoFijo(id: any, status: any): Observable<any> {
    return this.http.put(this.API + "api/tipo_gastos/baja/" + id + "/" + status, { responseType: 'text' });

  }


  ObtenerVentasXMes(mes: any): Observable<any> {
    // return this.http.get(this.API + "api/ventas/mes/" + mes.mes + "/" + mes.ano);
    return this.http.get(this.API + "api/producto/mas_vendido/mes/" + mes.mes + "/" + mes.ano + "/" + mes.id_sucursal + "/" + mes.id_tienda);

  }

  ProductosMasVendidos(mes: any): Observable<any> {
    return this.http.get(this.API + "api/producto/mas_vendido/mes/" + mes.mes + "/" + mes.ano);

  }

  ProductosMenosVendidos(mes: any): Observable<any> {
    return this.http.get(this.API + "api/producto/menos_vendido/mes/" + mes.mes + "/" + mes.ano);

  }

  ObtenerVentasXDia(fecha: any): Observable<any> {
    // return this.http.get(this.API + "api/ventas/day/" + fecha.dia);
    return this.http.get(this.API + "api/producto/mas_vendido/day/" + fecha.dia + "/" + fecha.id_sucursal + "/" + fecha.id_tienda);

  }

  ObtenerVentasXRango(rango: any): Observable<any> {
    // return this.http.get(this.API + "api/ventas/range/" + rango.fecha + "/" + rango.fecha2);
    return this.http.get(this.API + "api/producto/mas_vendido/range/" + rango.fecha + "/" + rango.fecha2 + "/" + rango.id_sucursal + "/" + rango.id_tienda);
    console.log(this.API + "api/ventas/range/" + rango.fecha[0] + "/" + rango.fecha2[0]);

  }

  ConsultarAlmacen() {
    return this.http.get(this.API + "api/almacen/consultar");
  }

  ObtenerAlmacenXMes(mes: any): Observable<any> {
    return this.http.get(this.API + "api/almacen_mes/", mes);

  }

  ObtenerAlmacenXDia(dia: any): Observable<any> {
    return this.http.get(this.API + "api/almacen_dia/", dia);

  }

  ObtenerAlmacenXRango(rango: any): Observable<any> {
    return this.http.get(this.API + "api/almacen_rango/", rango);

  }

  EntradasAlmacenDia(fecha: any): Observable<any> {
    // console.log(this.API + "api/almacen/movimientos/entradas/day/" + fecha.dia);
    return this.http.get(this.API + "api/almacen/movimientos/entradas/day/" + fecha.dia);

  }
  EntradasAlmacenMes(fecha: any): Observable<any> {
    // console.log(this.API + "api/almacen/movimientos/entradas/day/" + fecha.dia);
    return this.http.get(this.API + "api/almacen/movimientos/entradas/mes/" + fecha.mes + "/" + fecha.ano);

  }
  EntradasAlmacenRango(rango: any): Observable<any> {
    // console.log(this.API + "api/almacen/movimientos/entradas/day/" + fecha.dia);
    return this.http.get(this.API + "api/almacen/movimientos/entradas/range/" + rango.fecha + "/" + rango.fecha2);

  }
  SalidasAlmacenDia(fecha: any): Observable<any> {
    // console.log(this.API + "api/almacen/movimientos/entradas/day/" + fecha.dia);
    return this.http.get(this.API + "api/almacen/movimientos/salidas/day/" + fecha.dia);

  }
  SalidasAlmacenMes(fecha: any): Observable<any> {
    // console.log(this.API + "api/almacen/movimientos/entradas/day/" + fecha.dia);
    return this.http.get(this.API + "api/almacen/movimientos/salidas/mes/" + fecha.mes + "/" + fecha.ano);

  }
  SalidasAlmacenRango(rango: any): Observable<any> {
    // console.log(this.API + "api/almacen/movimientos/entradas/day/" + fecha.dia);
    return this.http.get(this.API + "api/almacen/movimientos/salidas/range/" + rango.fecha + "/" + rango.fecha2);

  }

}
