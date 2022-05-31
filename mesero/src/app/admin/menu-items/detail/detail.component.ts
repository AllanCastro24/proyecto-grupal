import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MenuItem } from 'src/app/app.models';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
})
export class DetailComponent implements OnInit {
  private sub: any;
  public menuItem!: MenuItem;
  constructor(public appService: AppService, private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.sub = this.activatedRoute.params.subscribe((params) => {
      if (params['id']) {
        this.getMenuItemById(params['id']);
      } else {
        this.getMenuItemById(20);
      }
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  public getMenuItemById(id: number) {
    this.appService.getMenuItemById(id).subscribe((data) => {
      this.menuItem = data;
    });
  }
}
