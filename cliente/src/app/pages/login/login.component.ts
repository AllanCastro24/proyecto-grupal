import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { AppSettings, Settings } from 'src/app/app.settings';
import { MenuService } from 'src/app/theme/components/menu/menu.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  public loginForm!: FormGroup;
  public hide = true;
  public settings: Settings;

  constructor(public menuService: MenuService, public fb: FormBuilder, public router: Router, public appSettings: AppSettings) {
    this.settings = this.appSettings.settings;
  }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: [null, Validators.compose([Validators.required, Validators.minLength(6)])],
      password: [null, Validators.compose([Validators.required, Validators.minLength(6)])],
      rememberMe: false,
    });

    this.menuService.toggleMenu(false);
  }

  public onLoginFormSubmit(): void {
    if (this.loginForm.valid) {
      this.menuService.toggleMenu(true);
      this.router.navigate(['/home']);
    }
  }
}
