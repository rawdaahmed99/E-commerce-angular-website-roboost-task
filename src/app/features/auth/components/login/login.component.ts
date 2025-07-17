import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../../core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  private authService = inject(AuthService);

  loginForm = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    rememberMe: new FormControl(false)
  });

  // State properties
  isLoading = false;
  errorMessage: string | null = null;
  showPassword = false;

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }


  onSubmit(): void {
   
    this.errorMessage = null;
    this.loginForm.markAllAsTouched();

    if (this.loginForm.invalid) {
      return; 
    }

    this.isLoading = true;
    const { username, password } = this.loginForm.value;

    if (username && password) {
      this.authService.login({ username, password }).subscribe({
        next: () => {
        
          console.log('Login successful');
        },
        error: (err: HttpErrorResponse) => {
          // Handle login errors
          this.isLoading = false;
          this.errorMessage = err.error?.message || 'فشل تسجيل الدخول. يرجى التحقق من بياناتك.';
          console.error('Login error:', err);
        },
        complete: () => {
          // This will be called on success or error completion
          this.isLoading = false;
        }
      });
    }
  }
}
