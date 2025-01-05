import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

type LoginForm = {
  email: FormControl<string>;
  password: FormControl<string>;
  rememberMe: FormControl<boolean>;
};

@Component({
  selector: 'play-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  loginForm: FormGroup<LoginForm>;

  constructor() {
    this.loginForm = new FormGroup<LoginForm>({
      email: new FormControl<string>('', {
        nonNullable: true,
        validators: [Validators.required, Validators.minLength(4)],
      }),
      password: new FormControl<string>('', {
        nonNullable: true,
        validators: [Validators.required, Validators.minLength(8)],
      }),
      rememberMe: new FormControl<boolean>(false, { nonNullable: true }),
    });
  }
}
