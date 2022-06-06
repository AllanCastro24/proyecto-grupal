import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { matchingPasswords } from 'src/app/theme/utils/app-validators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UsersService } from '../../../users/users.service';

@Component({
  selector: 'app-password-change',
  templateUrl: './password-change.component.html',
  styleUrls: ['./password-change.component.scss'],
})
export class PasswordChangeComponent implements OnInit {
  public passwordForm!: FormGroup;

  constructor(public formBuilder: FormBuilder, public snackBar: MatSnackBar, private UsersService: UsersService) {}

  ngOnInit(): void {
    this.passwordForm = this.formBuilder.group(
      {
        currentPassword: ['', Validators.required],
        newPassword: ['', Validators.required],
        confirmNewPassword: ['', Validators.required],
      },
      { validator: matchingPasswords('newPassword', 'confirmNewPassword') }
    );
  }

  public async onPasswordFormSubmit() {
    if (this.passwordForm.valid) {
      await this.UsersService.changePassword(this.passwordForm.value).toPromise();

      this.snackBar.open('Contraseña cambiada!', '×', { panelClass: 'success', verticalPosition: 'top', duration: 3000 });
    }
  }
}
