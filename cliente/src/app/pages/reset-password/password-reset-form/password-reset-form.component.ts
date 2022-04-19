import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-password-reset-form',
  templateUrl: './password-reset-form.component.html',
  styleUrls: ['./password-reset-form.component.scss'],
})
export class PasswordResetFormComponent implements OnInit {
  public passwordResetForm!: FormGroup;
  public hide = true;

  constructor(public fb: FormBuilder, private route: ActivatedRoute, public router: Router) {}

  ngOnInit(): void {
    this.passwordResetForm = this.fb.group({
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
    });
  }

  public onPasswordResetFormSubmit(): void {
    if (this.passwordResetForm.valid) {
      this.router.navigate(['../status'], { relativeTo: this.route });
    }
  }
}
