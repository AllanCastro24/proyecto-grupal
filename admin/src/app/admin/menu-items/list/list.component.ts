import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';  
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table'; 
import { ActivatedRoute } from '@angular/router';
import { MenuItem } from 'src/app/app.models';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit { 
  public idtienda:string ="";
  public idsucursal:string = "";
  public activo:any;
  ExisteCookie: boolean = false;
  displayedColumns: string[] = ['id', 'image', 'categoryId', 'name', 'price', 'availibilityCount', 'actions'];
  dataSource!: MatTableDataSource<MenuItem>;
  @ViewChild(MatPaginator, {static: true}) paginator!: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort!: MatSort;

  constructor(public appService:AppService,private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    /* this.idtienda = this.activatedRoute.snapshot.paramMap.get('idtienda');
    this.idsucursal = this.activatedRoute.snapshot.paramMap.get('idsuc'); */
    this.ExisteCookie = localStorage.getItem('ID_usuario') ? true : false;
    //Let mi_variable = ;
    if (this.ExisteCookie) {
      this.idsucursal= JSON.parse(localStorage.getItem("ID_sucursal")as string).ID_sucursal;
      this.idtienda=JSON.parse(localStorage.getItem("ID_tienda")as string).ID_tienda;
    }
    console.log(this.idsucursal);
    console.log(this.idtienda);
    
    this.getCategories();
    this.appService.getMenuItemssuc(this.idtienda, this.idsucursal).subscribe((menuItems:MenuItem[]) => {
      this.initDataSource(menuItems); 
      console.log(menuItems);
    })
  }

  public initDataSource(data:any){
    this.dataSource = new MatTableDataSource(data);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;  
    console.log(data);
  }  

  public getCategories(){
    if(!this.appService.Data.categories.length){
      this.appService.getCategories().subscribe(categories=>{ 
        this.appService.Data.categories = categories;
      });
    } 
  } 


  public remove(menuItem:MenuItem) {
    const index: number = this.dataSource.data.indexOf(menuItem);    
    if (index !== -1) {
      const message = this.appService.getTranslateValue('MESSAGE.SURE_DELETE');
			let dialogRef = this.appService.openConfirmDialog('', message!);
			dialogRef.afterClosed().subscribe(dialogResult => {
				if(dialogResult){ 
          this.dataSource.data.splice(index,1);
          this.initDataSource(this.dataSource.data); 
          console.log(this.dataSource.data.splice(index,1));
				}
			});  
    } 
    console.log(index);
  }

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
     
    this.appService.bajaplato3(this.idtienda, this.idsucursal,id, proveedor).subscribe((menuItems) => {
    });
    //this.ngOnInit();
   //console.log(this.activo + id);
 
   }
  

}
