import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { matchingPasswords, emailValidator } from 'src/app/theme/utils/app-validators';
import { MenuService } from 'src/app/theme/components/menu/menu.service';
import { UsersService } from '../../users/users.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  public registerForm!: FormGroup;
  public hide = true;

  constructor(
    public menuService: MenuService,
    public fb: FormBuilder,
    public router: Router,
    public snackBar: MatSnackBar,
    private UsersService: UsersService
  ) {}

  ngOnInit() {
    this.registerForm = this.fb.group(
      {
        username: ['', Validators.compose([Validators.required, Validators.minLength(4)])],
        email: ['', Validators.compose([Validators.required, emailValidator])],
        phone: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
        password: ['', Validators.required],
        confirmPassword: ['', Validators.required],
      },
      { validator: matchingPasswords('password', 'confirmPassword') }
    );

    this.menuService.toggleMenu(false);
  }

  public async onRegisterFormSubmit(): Promise<boolean> {
    if (!this.registerForm.valid) {
      return false;
    }

    await this.UsersService.signup(this.registerForm.value)
      .toPromise()
      .catch((err) => {
        console.log(err);
      });

    this.snackBar.open('Registrado!', '×', { panelClass: 'success', verticalPosition: 'top', duration: 3000 });

    this.router.navigate(['/login']);

    return true;
  }
}
