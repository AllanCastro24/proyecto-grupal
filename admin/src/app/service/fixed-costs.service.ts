import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FixedCostsService {
  API:string='https://tmp02.appsdev.cyou/proyecto-grupal-backend/';


  constructor(private clientHttp:HttpClient) { }

  ObtenerGastosFijos(){
    return this.clientHttp.get(this.API);
  }

  InsertarGastoFijo(datosGasto:any):Observable<any>{
    return this.clientHttp.post(this.API+"gastoFijo=1",datosGasto);

  }

  EditarGastoFijo(id:any,datosGasto:any):Observable<any>{
    return this.clientHttp.post(this.API+"?modificarGasto="+id,datosGasto);

  }

  BajaGastoFijo(id:any):Observable<any>{
    return this.clientHttp.get(this.API+"?bajaGastoFijo="+id);

  }
  

}
