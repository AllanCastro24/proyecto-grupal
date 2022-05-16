import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MenuItem } from 'src/app/app.models';
import { AppService } from 'src/app/app.service'; 

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {
  private sub: any;
  public menuItem!: any;
  constructor(public appService:AppService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.getCategories();
    this.sub = this.activatedRoute.params.subscribe(params => {  
      if(params['id']){
        this.getMenuItemById(params['id']); 
        
        //this.sub.value({menuItem: params['id']});
        //console.log(params);
      } 
      else{
        this.getMenuItemById(20); 
       // console.log(params);
      }
    }); 
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  } 

  public getCategories(){
    if(!this.appService.Data.categories.length){
      this.appService.getCategories().subscribe(categories=>{ 
        this.appService.Data.categories = categories;
      });
    } 
  } 

  public getMenuItemById(id:number){ 
    this.appService.getMenuItemById(id).subscribe(data=>{ 
      this.menuItem = data;  
      
      console.log(data);
      //this.menuItem.patchValue({data: this.menuItem.name['id']})
      //this.form.patchValue({id: menuItem[0]['id']});
     ////this.menuItem.weight = data;
      //this.menuItem.patchValue({name: this.menuItem.name['name']});
     // console.log(this.menuItem);
    }); 
  }

}
