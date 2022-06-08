import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from '../../../users/users.service';

@Component({
  selector: 'app-password-reset-form',
  templateUrl: './password-reset-form.component.html',
  styleUrls: ['./password-reset-form.component.scss'],
})
export class PasswordResetFormComponent implements OnInit {
  public passwordResetForm!: FormGroup;
  public hide = true;

  public email!: string;

  constructor(public fb: FormBuilder, private route: ActivatedRoute, public router: Router, private UsersService: UsersService) {}

  ngOnInit(): void {
    this.email = this.route.snapshot.paramMap.get('email') || '';

    this.passwordResetForm = this.fb.group({
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
    });
  }

  public async onPasswordResetFormSubmit(): Promise<boolean> {
    const users = await this.UsersService.getUsersFromBd().toPromise();
    const user = users.find((u: { Correo: string }) => u.Correo === this.email);

    if (!this.passwordResetForm.valid) {
      return false;
    }

    const password = {
      newPassword: this.passwordResetForm.get('password')?.value,
    };

    await this.UsersService.changePassword(password, user.ID_usuario)
      .toPromise()
      .catch((err) => {
        console.log(err);
      });

    this.router.navigate(['../status'], { relativeTo: this.route });

    return true;
  }
}
