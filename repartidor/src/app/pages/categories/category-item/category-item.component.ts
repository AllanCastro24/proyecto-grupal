import { Component, Input, OnInit } from '@angular/core';
import { AppService } from 'src/app/app.service';
import { Category } from '../categories';

@Component({
  selector: 'app-category-item',
  templateUrl: './category-item.component.html',
  styleUrls: ['./category-item.component.scss'],
})
export class CategoryItemComponent implements OnInit {
  @Input() lazyLoad: boolean = false;
  @Input() viewType: string = 'grid';

  public column: number = 4;

  @Input() category!: Category;

  constructor(public appService: AppService) {}

  ngOnInit(): void {}
}
