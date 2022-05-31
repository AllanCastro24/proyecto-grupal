import { Component, OnInit, ViewChild } from '@angular/core';
import { Category } from './categories';
import { CategoriesService } from './categories.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
})
export class CategoriesComponent implements OnInit {
  public viewType: string = 'grid';
  public viewCol: number = 50;

  public categories!: Category[];

  constructor(public categoriesService: CategoriesService) {}

  ngOnInit(): void {
    this.getCategories();
  }

  public getCategories() {
    this.categoriesService.getCategories().subscribe((categories) => {
      this.categories = categories;
    });
  }
}
