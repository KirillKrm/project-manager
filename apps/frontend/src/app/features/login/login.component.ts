import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { merge } from 'rxjs';

import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';

import { AuthService } from '../../core/auth.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatCardModule,
    MatButtonModule,
    MatSelectModule,
    MatDividerModule,
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  googleClientId = environment.googleClientId;
  googleLoginUrl = environment.googleLoginUrl;

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
      Validators.maxLength(20),
      // Validators.pattern(
      //   /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,20}$/
      // ),
    ]),
  });
  emailErrorMessage = signal('');
  passwordErrorMessage = signal('');
  errorMessage = '';
  showPassword = false;

  constructor(private authService: AuthService, private router: Router) {
    merge(
      this.loginForm.controls.email.statusChanges,
      this.loginForm.controls.email.valueChanges
    )
      .pipe(takeUntilDestroyed())
      .subscribe(() => {
        this.updateEmailErrorMessage();
      });
    merge(
      this.loginForm.controls.password.statusChanges,
      this.loginForm.controls.password.valueChanges
    )
      .pipe(takeUntilDestroyed())
      .subscribe(() => {
        this.updatePasswordErrorMessage();
      });
  }

  ngOnInit() {
    const currentUrl = window.location.href;
    if (currentUrl.includes('google/redirect')) {
      this.authService.handleRedirect().subscribe(() => {
        this.router.navigate(['/profile']);
      });
    }
  }

  updateEmailErrorMessage() {
    if (this.loginForm.controls.email.invalid) {
      this.emailErrorMessage.set('Email is invalid');
    } else {
      this.emailErrorMessage.set('');
    }
  }

  updatePasswordErrorMessage() {
    if (this.loginForm.controls.password.invalid) {
      this.passwordErrorMessage.set('Password is invalid');
    } else {
      this.passwordErrorMessage.set('');
    }
  }

  clickShowPassword(event: MouseEvent) {
    this.showPassword = !this.showPassword;
    event.stopPropagation();
  }

  login() {
    if (this.loginForm.invalid) {
      console.error('Form is invalid');
      return;
    }

    const { email, password } = this.loginForm.value;

    if (email && password) {
      this.authService.login(email, password).subscribe({
        next: () => {
          if (this.router) {
            this.router.navigate(['/profile']);
          }
        },
        error: (error) => {
          this.errorMessage = error;
        },
      });
    }
  }

  googleLogin() {
    this.authService.googleLogin();
  }
}
