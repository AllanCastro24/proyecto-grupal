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
  selector: 'app-menu-sucursal',
  templateUrl: './menu-sucursal.component.html',
  styleUrls: ['./menu-sucursal.component.scss']
})
export class MenuSucursalComponent implements OnInit {
  

  constructor() { }

  ngOnInit(): void {
  }

}
