import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';  
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table'; 
import { MenuItem } from 'src/app/app.models';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-listar-proveedores',
  templateUrl: './listar-proveedores.component.html',
  styleUrls: ['./listar-proveedores.component.scss']
})
export class ListarProveedoresComponent implements OnInit {

  displayedColumns: string[] = ['id', 'nombre', 'telefono', 'rfc', 'actions'];
  dataSource!: MatTableDataSource<MenuItem>;
  @ViewChild(MatPaginator, {static: true}) paginator!: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort!: MatSort;
  
  constructor(public appService:AppService) { }
  activo: any;
  ngOnInit(): void {
    //this.getCategories();

    this.getproveedores();
    
  }

  public initDataSource(data:any){
    this.dataSource = new MatTableDataSource(data);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;  
  }  

  /* public getCategories(){
    if(!this.appService.Data.categories.length){
      this.appService.getCategories().subscribe(categories=>{ 
        this.appService.Data.categories = categories;
      });
    } 
  }  */




public state(event: any, id: any): void {

   this.activo = false;

    if (event.checked) {
      this.activo = true;
    } else {
      this.activo = false;
    }

    let proveedor = {
      estatus: this.activo
    }
    this.appService.ActualizarEstatusProveedor(id, proveedor).subscribe((menuItems) => {
      this.appService.GetProveedor().subscribe((menuItems) => {
        this.initDataSource(menuItems); 
      })
    });
    

    
  }


  getproveedores(){
    this.appService.GetProveedor().subscribe((menuItems) => {
      this.initDataSource(menuItems); 
    });
  }
}
