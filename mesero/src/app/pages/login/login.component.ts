import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AppSettings, Settings } from 'src/app/app.settings';
import { MenuService } from 'src/app/theme/components/menu/menu.service';
import { User } from 'src/app/users/users';
import { UsersService } from '../../users/users.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  public loginForm!: FormGroup;
  public hide = true;
  public settings: Settings;

  public snackBarDefault: any = {
    horizontalPosition: 'end',
    verticalPosition: 'top',
    duration: 2000,
  };

  constructor(
    public menuService: MenuService,
    public fb: FormBuilder,
    public router: Router,
    public appSettings: AppSettings,
    private snackBar: MatSnackBar,
    private UsersService: UsersService
  ) {
    this.settings = this.appSettings.settings;
  }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: [null, Validators.compose([Validators.required, Validators.minLength(4)])],
      password: [null, Validators.compose([Validators.required, Validators.minLength(4)])],
      rememberMe: false,
    });

    this.menuService.toggleMenu(false);

    this.UsersService.isLoggedIn.subscribe((res) => {
      if (res) {
        this.router.navigate(['./tables']);
      }
    });
  }

  public async onLoginFormSubmit() {
    if (!this.loginForm.valid) {
      return;
    }

    const data: User = {
      username: this.loginForm.get('username')?.value,
      password: this.loginForm.get('password')?.value,
    };

    const user = await this.UsersService.login(data).toPromise();

    if (!(await this.UsersService._login(user))) {
      this.snackBar.open('Usuario y/o contraseña equivocados', '', this.snackBarDefault);
      return;
    }

    this.snackBar.open('Login exitoso', '', this.snackBarDefault);

    this.menuService.toggleMenu(true);
    this.router.navigate(['./tables']);
  }
}
