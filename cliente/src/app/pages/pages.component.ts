import { Component, OnInit, ViewChild, HostListener, Inject, PLATFORM_ID } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Settings, AppSettings } from '../app.settings';
import { isPlatformBrowser } from '@angular/common';
import { AppService } from '../app.service';
import { CategoriesService } from './categories/categories.service';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.scss'],
})
export class PagesComponent implements OnInit {
  @ViewChild('sidenav') sidenav: any;
  public headerTypes = ['default', 'image', 'carousel', 'video'];
  public headerTypeOption: string = '';
  public headerFixed: boolean = false;

  public settings: Settings;
  constructor(public appSettings: AppSettings, public router: Router, @Inject(PLATFORM_ID) private platformId: Object, public appService: AppService, public categoriesService: CategoriesService) {
    this.settings = this.appSettings.settings;
  }

  ngOnInit() {
    this.headerTypeOption = this.settings.header;
  }

  public changeTheme(theme: string) {
    this.settings.theme = theme;
  }

  public chooseHeaderType() {
    this.settings.header = this.headerTypeOption;
    if (isPlatformBrowser(this.platformId)) {
      window.scrollTo(0, 0);
    }
    this.router.navigate(['/']);
  }

  public scrollToTop() {
    var scrollDuration = 200;
    var scrollStep = -window.pageYOffset / (scrollDuration / 20);
    var scrollInterval = setInterval(() => {
      if (window.pageYOffset != 0) {
        window.scrollBy(0, scrollStep);
      } else {
        clearInterval(scrollInterval);
      }
    }, 10);
    if (window.innerWidth <= 768) {
      setTimeout(() => {
        if (isPlatformBrowser(this.platformId)) {
          window.scrollTo(0, 0);
        }
      });
    }
  }

  ngAfterViewInit() {
    if (document.getElementById('preloader')) {
      document.getElementById('preloader')?.classList.add('hide');
    }
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.sidenav.close();
        this.settings.mainToolbarFixed = false;
        setTimeout(() => {
          if (isPlatformBrowser(this.platformId)) {
            window.scrollTo(0, 0);
          }
        });
      }
    });
  }
}
