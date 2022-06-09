import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AppSettings, Settings } from 'src/app/app.settings';
import { MenuService } from 'src/app/theme/components/menu/menu.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss'],
})
export class ResetPasswordComponent implements OnInit {
  public resetPasswordForm!: FormGroup;
  public hide = true;
  public settings: Settings;

  constructor(
    public menuService: MenuService,
    public fb: FormBuilder,
    private route: ActivatedRoute,
    public router: Router,
    public appSettings: AppSettings
  ) {
    this.settings = this.appSettings.settings;
  }

  ngOnInit(): void {
    this.resetPasswordForm = this.fb.group({
      email: ['', Validators.compose([Validators.required])],
    });

    this.menuService.toggleMenu(false);
  }

  public onResetPasswordFormSubmit(): void {
    if (this.resetPasswordForm.valid) {
      this.router.navigate(['form', { email: this.resetPasswordForm.get('email')?.value }], { relativeTo: this.route });
    }
  }
}
