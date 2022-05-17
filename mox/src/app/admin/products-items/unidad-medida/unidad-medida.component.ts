import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator'; 
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table'; 
import { Category } from 'src/app/app.models';
import { AppService } from 'src/app/app.service';
import { CategoriaDialogMedidaComponent } from './categoria-dialog-medida/categoria-dialog-medida.component'; 

@Component({
  selector: 'app-unidad-medida',
  templateUrl: './unidad-medida.component.html',
  styleUrls: ['./unidad-medida.component.scss']
})
export class UnidadMedidaComponent implements OnInit {

  displayedColumns: string[] = ['id', 'name', 'description', 'edit', 'remove'];
  dataSource!: MatTableDataSource<Category>;
  @ViewChild(MatPaginator, {static: true}) paginator!: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort!: MatSort;
   
  constructor(public appService:AppService, public snackBar: MatSnackBar) { }

  ngOnInit(): void {
    /* this.appService.getCategoriesUnidadMedida().subscribe((categories:Category[]) => {
      this.initDataSource(categories); 
    }) */
    this.LoadChangesAllCat();
  }

  public initDataSource(data:any){
    this.dataSource = new MatTableDataSource(data);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort; 
  } 
 
  public remove(category:Category, id: any) {
    const index: number = this.dataSource.data.indexOf(category);    
    if (index !== -1) {
      const message = this.appService.getTranslateValue('MESSAGE.SURE_DELETE');
			let dialogRef = this.appService.openConfirmDialog('', message!);
			dialogRef.afterClosed().subscribe(dialogResult => {
				if(dialogResult){ 
          this.dataSource.data.splice(index,1);
          //this.initDataSource(this.dataSource.data); 
          this.appService.Delete_Unidad_Medida(id).subscribe(respuesta => {
            console.log(respuesta);
            this.LoadChangesAllCat(); 
          });
        }
			});  
    } 
  }  

  public openCategoryDialog(category:Category | null){
    const dialogRef = this.appService.openDialog(CategoriaDialogMedidaComponent, category, 'theme-dialog');
    dialogRef.afterClosed().subscribe(cat => {  
      if(cat){
        let message = '';      
        const index: number = this.dataSource.data.findIndex(x => x.id == cat.id); 
        if(index !== -1){
          this.dataSource.data[index] = cat;
          message = 'Unidad de Medida '+cat.name+' updated successfully';
        } 
        else{ 
          let last_category = this.dataSource.data[this.dataSource.data.length - 1]; 
          cat.id = last_category.id + 1; 
          this.dataSource.data.push(cat); 
          this.paginator.lastPage();
          message = 'New Unidad de Medida '+cat.name+' added successfully!'; 
        }  
        this.LoadChangesAllCat();
        this.snackBar.open(message, '×', { panelClass: 'success', verticalPosition: 'top', duration: 3000 });          
      }
    });  
  }


  LoadChangesAllCat() {
    this.appService.GetUnidad_Medida().subscribe(respuesta => {
      console.log(respuesta)
      this.initDataSource(respuesta);
      //this.AllCategorias = respuesta;
    });
  }


}
