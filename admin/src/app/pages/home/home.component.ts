import { Component, OnInit } from '@angular/core';
import { Settings, AppSettings } from 'src/app/app.settings';
import { AppService } from 'src/app/app.service';  
import { MenuItem } from 'src/app/app.models';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {  
  public slides = []; 
  public specialMenuItems:Array<MenuItem> = [];
  public bestMenuItems:Array<MenuItem> = [];
  public todayMenu!:MenuItem;

  public settings: Settings;
  constructor(public appSettings:AppSettings, public appService:AppService ) {
    this.settings = this.appSettings.settings;  
  }

  ngOnInit(): void {
    /* this.getSlides();
    this.getSpecialMenuItems();
    this.getBestMenuItems();
    this.getTodayMenu(); */
    this.mostrartiesuc();
  }

  public getSlides(){
    this.appService.getHomeCarouselSlides().subscribe((res:any)=>{
      this.slides = res;
    });
  }
 
  public getSpecialMenuItems(){
    this.appService.getSpecialMenuItems().subscribe(menuItems=>{
      this.specialMenuItems = menuItems;
    });
  } 

  public getBestMenuItems(){
    this.appService.getBestMenuItems().subscribe(menuItems=>{
      this.bestMenuItems = menuItems;
    });
  }

  public getTodayMenu(){
    this.appService.getMenuItemById(23).subscribe(data=>{ 
      this.todayMenu = data;  
    });
  }  

  datosmpl = null as any;

  mostrartiesuc(){
    this.appService.mostrartiesuc().subscribe(result => this.datosmpl  = result)
    console.log('holaaa'+ this.datosmpl);
    //this.suma();
    //this.insertarpla();
  }
  
  hayregistropla(){
    if(this.datosmpl == null){
      return false;
    } else{
      return true;
    }
  }

}
