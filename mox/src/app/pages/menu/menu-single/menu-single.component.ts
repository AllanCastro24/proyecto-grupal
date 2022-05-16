import { Component, OnInit, ViewChild, HostListener, ViewChildren, QueryList } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AppSettings, Settings } from 'src/app/app.settings';
import { AppService } from 'src/app/app.service';
import { MenuItem } from 'src/app/app.models';
import { MatSnackBar } from '@angular/material/snack-bar';

import { MediaChange, MediaObserver } from '@angular/flex-layout';
import { MatPaginator } from '@angular/material/paginator';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar'; 
import { Subscription } from 'rxjs/internal/Subscription';
import { filter, map } from 'rxjs/operators';
import {  Pagination } from 'src/app/app.models';
import { id } from '@swimlane/ngx-charts';


@Component({
  selector: 'app-menu-single',
  templateUrl: './menu-single.component.html',
  styleUrls: ['./menu-single.component.scss']
})
export class MenuSingleComponent implements OnInit {
  /* private sub: any;
  public menuItem!: MenuItem; 
  public settings: Settings; 
  public quantityCount:number = 1;
  public relatedMenuItems:Array<MenuItem> = [];

  constructor(public appSettings:AppSettings, 
              public appService:AppService, 
              private activatedRoute: ActivatedRoute,  
              public fb: FormBuilder,
              public snackBar: MatSnackBar) {
    this.settings = this.appSettings.settings; 
  }

  ngOnInit() { 
    this.sub = this.activatedRoute.params.subscribe(params => {  
      this.getMenuItemById(params['id']); 
    }); 
    this.getRelatedMenuItems();
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }  

  public getMenuItemById(id:number){
    const index: number = this.appService.Data.cartList.findIndex(item => item.id == id);
    if(index !== -1){
      this.menuItem = this.appService.Data.cartList[index];
      this.quantityCount = this.menuItem.cartCount;
    } 
    else{
      this.appService.getMenuItemById(id).subscribe(data=>{ 
        this.menuItem = data;  
      });
    } 
  }

  public counterChange(count:number){ 
    this.quantityCount = count;   
  } 

  public addToCart(){ 
    this.menuItem.cartCount = this.quantityCount;
    if(this.menuItem.cartCount <= this.menuItem.availibilityCount){
      const index: number = this.appService.Data.cartList.findIndex(item => item.id == this.menuItem.id); 
      (index !== -1) ? this.appService.Data.cartList[index] = this.menuItem : this.appService.addToCart(this.menuItem, null); 
      this.appService.calculateCartTotal();
    }
    else{
      this.menuItem.cartCount = this.menuItem.availibilityCount;
      this.snackBar.open('You can not add more items than available. In stock ' + this.menuItem.availibilityCount + ' items and you already added ' + this.menuItem.cartCount + ' item to your cart', '×', { panelClass: 'error', verticalPosition: 'top', duration: 5000 });
    }
  }


  public addToFavorites(){  
    this.appService.addToFavorites(this.menuItem);
  } 

  public getRelatedMenuItems(){ 
    this.appService.getMenuItems().subscribe(data=>{
      this.relatedMenuItems = this.appService.shuffleArray(data).slice(0, 999999); 
    });
  }   */
  @ViewChild('sidenav') sidenav: any;
  public sidenavOpen:boolean = false;
  public showSidenavToggle:boolean = false;
  public idtienda:any;
  public idsucursal:any;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  public psConfig: PerfectScrollbarConfigInterface = {
    wheelPropagation:true
  };  
  public menuItems: MenuItem[] = [];
  public categories:any[] = [];
  public viewType: string = 'grid';
  public viewCol: number = 25;
  public count: number = 10;
  public sort: string = '';
  public selectedCategoryId:number = 0;
  public pagination:Pagination = new Pagination(1, this.count, null, 2, 0, 0); 
  public message:string | null = '';
  public watcher: Subscription;
  public settings: Settings;

  constructor(private activatedRoute: ActivatedRoute,public appSettings:AppSettings, public appService:AppService, public mediaObserver: MediaObserver) {
    this.settings = this.appSettings.settings; 
    this.watcher = mediaObserver.asObservable()
    .pipe(filter((changes: MediaChange[]) => changes.length > 0), map((changes: MediaChange[]) => changes[0]))
    .subscribe((change: MediaChange) => {
      if(change.mqAlias == 'xs') {
        this.sidenavOpen = false;
        this.showSidenavToggle = true;
        this.viewCol = 100;
      }
      else if(change.mqAlias == 'sm'){
        this.sidenavOpen = false;
        this.showSidenavToggle = true;
        this.viewCol = 50;
      }
      else if(change.mqAlias == 'md'){
        this.sidenavOpen = false;
        this.showSidenavToggle = false;
        this.viewCol = 33.3;
      }
      else{
        this.sidenavOpen = false;
        this.showSidenavToggle = false;
        this.viewCol = 25;
      }
    });


  }

  ngOnInit(): void {
    this.idtienda = this.activatedRoute.snapshot.paramMap.get('id');
    this.idsucursal = this.activatedRoute.snapshot.paramMap.get('idsuc');
     this.activatedRoute.params.subscribe(params => {  
      this.getMenuItems(params['id'],params['idsuc']); 
     // this.id = this.getMenuItems(params['id']); 
    }); 
    //this.getMenuItems();
    this.getCategories();
   // this.getMenuItems();
  }

  ngOnDestroy(){ 
    this.watcher.unsubscribe();
  }

  public getCategories(){
    this.appService.getCategories().subscribe(categories=>{
      this.categories = categories;
      this.appService.Data.categories = categories;
    })
  } 
  public selectCategory(id:number){
    this.selectedCategoryId = id;
    this.menuItems.length = 0;
    this.resetPagination();
    this.activatedRoute.params.subscribe(params => {  
      this.getMenuItems(params['id'],params['idsuc']); 
     // this.id = this.getMenuItems(params['id']); 
    });
    this.sidenav.close();
  }
  public onChangeCategory(event:any){ 
    this.selectCategory(event.value);
  }

  public getMenuItems(id:any, idsuc:any){
    this.appService.getMenuItemssucalta(id,idsuc).subscribe(data => {
      // this.menuItems = this.appService.shuffleArray(data);
      // this.menuItems = data;
      let result = this.filterData(data); 
      //console.log("ssad"+data);
      if(result.data.length == 0){
        this.menuItems.length = 0;
        this.pagination = new Pagination(1, this.count, null, 2, 0, 0);  
        this.message = 'SIN RESULTADOS'; 
        //console.log("ssad"+data);
      } 
      else{
        this.menuItems = result.data; 
        this.pagination = result.pagination;
        this.message = null;
        //console.log("ssad"+data);
      } 
      console.log("ssad"+data);
    })
  }  

  public resetPagination(){ 
    if(this.paginator){
      this.paginator.pageIndex = 0;
    }
    this.pagination = new Pagination(1, this.count, null, null, this.pagination.total, this.pagination.totalPages);
  }

  public filterData(data:any){
    return this.appService.filterData(data, this.selectedCategoryId, this.sort, this.pagination.page, this.pagination.perPage);
  }
  // public filterData(data){
  //   return this.appService.filterData(data, this.searchFields, this.sort, this.pagination.page, this.pagination.perPage);
  // }

  public changeCount(count:number){
    this.count = count;   
    this.menuItems.length = 0;
    this.resetPagination();
    this.activatedRoute.params.subscribe(params => {  
      this.getMenuItems(params['id'],params['idsuc']); 
     // this.id = this.getMenuItems(params['id']); 
    });
  }
  public changeSorting(sort:any){    
    this.sort = sort; 
    this.menuItems.length = 0;
    this.activatedRoute.params.subscribe(params => {  
      this.getMenuItems(params['id'],params['idsuc']); 
     // this.id = this.getMenuItems(params['id']); 
    });
  }
  public changeViewType(obj:any){ 
    this.viewType = obj.viewType;
    this.viewCol = obj.viewCol; 
  } 


  public onPageChange(e:any){ 
    this.pagination.page = e.pageIndex + 1;
    this.activatedRoute.params.subscribe(params => {  
      this.getMenuItems(params['id'],params['idsuc']); 
     // this.id = this.getMenuItems(params['id']); 
    });
    window.scrollTo(0,0);  
  }


}
