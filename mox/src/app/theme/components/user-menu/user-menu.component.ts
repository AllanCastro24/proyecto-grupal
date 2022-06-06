import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-user-menu',
  templateUrl: './user-menu.component.html',
  styleUrls: ['./user-menu.component.scss']
})
export class UserMenuComponent implements OnInit {

  constructor(public appService:AppService) { }
  ExisteCookie: boolean = false;
  ngOnInit() {
    //const ExisteCookie: boolean = this.cookieService.check('usuario');
    this.ExisteCookie = localStorage.getItem('ID_usuario') ? true : false;
    console.log(this.ExisteCookie);
    
  }

}
