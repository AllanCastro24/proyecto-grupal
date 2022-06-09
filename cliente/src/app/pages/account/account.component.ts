import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { User } from 'src/app/users/users';
import { UsersService } from 'src/app/users/users.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss'],
})
export class AccountComponent implements OnInit {
  public psConfig: PerfectScrollbarConfigInterface = {
    wheelPropagation: true,
  };

  @ViewChild('sidenav') sidenav: any;

  public tmp: Function = new Function();

  public sidenavOpen: boolean = true;
  public links = [
    { name: 'Inicio', href: 'dashboard', icon: 'dashboard' },
    { name: 'Perfil', href: 'profile', icon: 'person' },
    { name: 'Cambiar contraseña', href: 'password-change', icon: 'vpn_key' },
    { name: 'Direcciones', href: 'addresses', icon: 'location_on' },
    { name: 'Tarjetas', href: 'payments', icon: 'payment' },
    {
      name: 'Cerrar sesión',
      href: '',
      icon: 'power_settings_new',
      action: () => {
        this.usersService.logout();
      },
    },
  ];

  public user!: User;

  constructor(public router: Router, public usersService: UsersService) {}

  ngOnInit() {
    if (window.innerWidth < 960) {
      this.sidenavOpen = false;
    }

    this.user = this.usersService.getUser();
  }

  @HostListener('window:resize')
  public onWindowResize(): void {
    window.innerWidth < 960 ? (this.sidenavOpen = false) : (this.sidenavOpen = true);
  }

  ngAfterViewInit() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        if (window.innerWidth < 960) {
          this.sidenav.close();
        }
      }
    });
  }
}
