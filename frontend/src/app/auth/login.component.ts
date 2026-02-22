import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgIf } from '@angular/common';
import { AuthService } from '../core/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf],
  template: `
    <div class="container">
      <div class="card" style="max-width:420px; margin:3rem auto;">
        <h2>Login</h2>
        <form [formGroup]="loginForm" (ngSubmit)="onSubmit()" class="grid">
          <input type="text" placeholder="Username" formControlName="username" />
          <input type="password" placeholder="Password" formControlName="password" />
          <button type="submit" [disabled]="loginForm.invalid">Sign In</button>
          <p *ngIf="error" class="error">{{ error }}</p>
        </form>
      </div>
    </div>
  `
})
export class LoginComponent {
  error = '';

  loginForm = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required]
  });

  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router) {}

  onSubmit(): void {
    if (this.loginForm.invalid) {
      return;
    }

    const { username, password } = this.loginForm.getRawValue();
    this.auth.login(username!, password!).subscribe({
      next: () => this.router.navigate(['/employees']),
      error: () => (this.error = 'Invalid credentials. Please try again.')
    });
  }
}
