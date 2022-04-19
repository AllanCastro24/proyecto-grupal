import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResetPasswordComponent } from './reset-password.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { PasswordResetStatusComponent } from './password-reset-status/password-reset-status.component';
import { PasswordResetFormComponent } from './password-reset-form/password-reset-form.component';

export const routes = [
  { path: '', component: ResetPasswordComponent, pathMatch: 'full' },
  { path: 'form', component: PasswordResetFormComponent },
  { path: 'status', component: PasswordResetStatusComponent },
];

@NgModule({
  declarations: [
    ResetPasswordComponent,
    PasswordResetStatusComponent,
    PasswordResetFormComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule
  ],
})
export class ResetPasswordModule {}
