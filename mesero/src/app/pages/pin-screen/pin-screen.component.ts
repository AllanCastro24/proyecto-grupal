import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-pin-screen',
  templateUrl: './pin-screen.component.html',
  styleUrls: ['./pin-screen.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class PinScreenComponent implements OnInit {
  public date: any = new Date();
  public timerInterval: any;
  public form!: FormGroup;
  constructor(public fb: FormBuilder, public router: Router) {}

  ngOnInit() {
    this.timerInterval = setInterval(() => {
      this.date = new Date();
    }, 1000);
    this.form = this.fb.group({
      password: [null, Validators.compose([Validators.required, Validators.minLength(3)])],
    });
  }

  ngAfterViewInit() {
    document.getElementById('preloader')?.classList.add('hide');
  }

  ngOnDestroy() {
    clearInterval(this.timerInterval);
  }

  public onSubmit(values: Object): void {
    console.log(values)
    if (this.form.valid) {
      this.router.navigate(['/']);
    }
  }
}
