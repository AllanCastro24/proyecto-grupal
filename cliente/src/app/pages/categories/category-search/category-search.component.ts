import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'app-category-search',
  templateUrl: './category-search.component.html',
  styleUrls: ['./category-search.component.scss'],
})
export class CategorySearchComponent implements OnInit {
  @ViewChild('inputSearch') input!: ElementRef;

  public status: string = 'search';

  public showClose: boolean = false;
  public showSuggestions: boolean = false;

  constructor() {}

  ngOnInit() {}

  public onSearch() {
    this.status = 'arrow_back';
    this.showSuggestions = true;

    document.body.style.overflow = 'hidden';
  }

  public onReturn() {
    this.status = 'search';
    this.showSuggestions = false;
    
    document.body.style.overflow = 'auto';
  }

  public onInput(event: any) {
    this.showClose = event.target.value.length > 0;
  }

  public onClose() {
    this.showClose = false;
    this.input.nativeElement.value = '';
  }
}
