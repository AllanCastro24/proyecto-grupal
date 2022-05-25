import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-password-reset-status',
  templateUrl: './password-reset-status.component.html',
  styleUrls: ['./password-reset-status.component.scss'],
})
export class PasswordResetStatusComponent implements OnInit {
  private sub: any;

  private hash!: string;
  public msg!: string;

  constructor(private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.sub = this.activatedRoute.params.subscribe((params) => {
      this.hash = params['hash'];
    });

    this.msg = 'Contraseña cambiada con éxito';
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
