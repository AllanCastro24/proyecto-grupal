import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { matchingPasswords, emailValidator } from 'src/app/theme/utils/app-validators';
import { DomSanitizer } from '@angular/platform-browser';
import { MenuService } from 'src/app/theme/components/menu/menu.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  public registerForm!: FormGroup;
  public hide = true;

  constructor(public menuService: MenuService, public fb: FormBuilder, public router: Router, public snackBar: MatSnackBar, private sanitizer: DomSanitizer) {}

  ngOnInit() {
    this.registerForm = this.fb.group(
      {
        username: ['', Validators.compose([Validators.required, Validators.minLength(6)])],
        email: ['', Validators.compose([Validators.required, emailValidator])],
        phone: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
        password: ['', Validators.required],
        confirmPassword: ['', Validators.required],
        receiveNewsletter: false,
      },
      { validator: matchingPasswords('password', 'confirmPassword') }
    );

    this.menuService.toggleMenu(false);
  }

  public onRegisterFormSubmit(): void {
    if (this.registerForm.valid) {
      console.log(this.registerForm.value);
      this.snackBar.open('You registered successfully!', '×', { panelClass: 'success', verticalPosition: 'top', duration: 3000 });
    }
  }
}
