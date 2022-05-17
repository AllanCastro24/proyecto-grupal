import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator'; 
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table'; 
import { Category } from 'src/app/app.models';
import { AppService } from 'src/app/app.service';
import { ModalStockComponent } from './modal-stock/modal-stock.component';

@Component({
  selector: 'app-stock-min',
  templateUrl: './stock-min.component.html',
  styleUrls: ['./stock-min.component.scss']
})
export class StockMinComponent implements OnInit {
  //{ "id":1, "name":"coca cola", "detalle": "cocacola light", "tamaño": "500", "unidad": "ml", "stock": "85" }
  displayedColumns: string[] = ['id', 'name', 'detalle', 'tamano', 'unidad', 'stock', 'edit'];
  dataSource!: MatTableDataSource<Category>;
  @ViewChild(MatPaginator, {static: true}) paginator!: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort!: MatSort;

  constructor(public appService:AppService, public snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.load();
  }

  public initDataSource(data:any){
    this.dataSource = new MatTableDataSource(data);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort; 
  } 
 
  /* public remove(category:Category) {
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
  }  */ 

  public openCategoryDialog(category:Category | null){
    const dialogRef = this.appService.openDialog(ModalStockComponent, category, 'theme-dialog');
    dialogRef.afterClosed().subscribe(cat => {  
      if(cat){
        let message = '';      
        const index: number = this.dataSource.data.findIndex(x => x.id == cat.id); 
        if(index !== -1){
          this.dataSource.data[index] = cat;
          message = 'Stock Minimo '+cat.name+' updated successfully';
          this.load();
        } 
        else{ 
          let last_category = this.dataSource.data[this.dataSource.data.length - 1]; 
          cat.id = last_category.id + 1; 
          this.dataSource.data.push(cat); 
          this.paginator.lastPage();
          message = 'New category '+cat.name+' added successfully!'; 
        }  
        this.load();
        this.snackBar.open(message, '×', { panelClass: 'success', verticalPosition: 'top', duration: 3000 });          
      }
    });  
  }




  load(){
    this.appService.Get_Stock_Minimo().subscribe((categories) => {
      this.initDataSource(categories); 
    });
  }

}
