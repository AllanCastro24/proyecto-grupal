import { Component, OnInit } from '@angular/core';
import { Category } from '../categories';
import { CategoriesService } from '../categories.service';

@Component({
  selector: 'app-frequent-categories',
  templateUrl: './frequent-categories.component.html',
  styleUrls: ['./frequent-categories.component.scss'],
})
export class FrequentCategoriesComponent implements OnInit {
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
