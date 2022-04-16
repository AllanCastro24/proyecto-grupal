import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-plate',
  templateUrl: './plate.component.html',
  styleUrls: ['./plate.component.scss'],
})
export class PlateComponent implements OnInit {
  private sub: any;

  public quantityCount: number = 1;

  public price: number = 100;

  constructor(private _location: Location, private activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.sub = this.activatedRoute.params.subscribe((params) => {
      // this.getMenuItemById(params['id']);
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  public counterChange(count: number) {
    this.quantityCount = count;
  }

  public onReturn() {
    this._location.back();
  }
}
