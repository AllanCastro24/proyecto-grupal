import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator'; 
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table'; 
import { ActivatedRoute } from '@angular/router';
import { Category } from 'src/app/app.models';
import { AppService } from 'src/app/app.service';
import { CategoryDialogComponent } from './category-dialog/category-dialog.component';
import { CookieService } from 'ngx-cookie-service';
@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'description', 'edit','remove'];
  dataSource!: MatTableDataSource<Category>;
  @ViewChild(MatPaginator, {static: true}) paginator!: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort!: MatSort;

  public activo:any;
  public idtienda:any;
  public idsucursal:any;
  
  constructor(public appService:AppService, public snackBar: MatSnackBar,private activatedRoute: ActivatedRoute,private cookieService: CookieService) { }

  ngOnInit(): void {
    this.idtienda = this.activatedRoute.snapshot.paramMap.get('idtienda');
    this.idsucursal = this.activatedRoute.snapshot.paramMap.get('idsuc');
    this.appService.getCategoriesab(this.idtienda,this.idsucursal).subscribe((categories:Category[]) => {
      this.initDataSource(categories); 
      console.log(categories);
      console.log(this.idtienda);
      console.log(this.idsucursal);
      this.cookieService.delete('idtienda');
      this.cookieService.delete('idsucursal');
      this.cookieService.set('idtienda', this.idtienda);
      this.cookieService.set('idsucursal', this.idsucursal);
       
    })
  }
  
  public initDataSource(data:any){
    this.dataSource = new MatTableDataSource(data);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort; 
  } 
 
  public remove(category:Category) {
    const index: number = this.dataSource.data.indexOf(category);    
    if (index !== -1) {
      const message = this.appService.getTranslateValue('MESSAGE.SURE_DELETE');
			let dialogRef = this.appService.openConfirmDialog('', message!);
			dialogRef.afterClosed().subscribe(dialogResult => {
				if(dialogResult){ 
          this.dataSource.data.splice(index,1);
          this.initDataSource(this.dataSource.data); 
				}
			});  
    } 
  }  

  public openCategoryDialog(category:Category | null,){
    const dialogRef = this.appService.openDialog(CategoryDialogComponent, category, 'theme-dialog');
    dialogRef.afterClosed().subscribe(cat => {  
      if(cat){
        let message = '';      
        const index: number = this.dataSource.data.findIndex(x => x.id == cat.id); 
        if(index !== -1){
          this.dataSource.data[index] = cat;
          message = 'Category '+cat.name+' updated successfully';
        } 
        else{ 
          let last_category = this.dataSource.data[this.dataSource.data.length - 1]; 
          cat.id = last_category.id + 1; 
          this.dataSource.data.push(cat); 
          this.paginator.lastPage();
          message = 'New category '+cat.name+' added successfully!'; 
        }  
        this.initDataSource(this.dataSource.data); 
        this.snackBar.open(message, '×', { panelClass: 'success', verticalPosition: 'top', duration: 3000 });          
      }
    });  
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
     
     this.appService.bajaoaltacatmenu(id, this.idtienda,this.idsucursal, proveedor).subscribe(() => {
    });
    //this.ngOnInit();
   console.log(this.activo + id);
 
   }
  

}
