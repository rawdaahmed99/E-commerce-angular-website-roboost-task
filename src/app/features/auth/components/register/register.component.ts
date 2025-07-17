import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  Validators,
  FormGroup,
  ReactiveFormsModule,
  AbstractControl,
  ValidationErrors,
  ValidatorFn,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../../../core/services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);

  isLoading = false;
  errorMessage: string | null = null;
  showPassword = false;
  showConfirmPassword = false;

  registerForm: FormGroup = this.fb.group(
    {
      username: ['', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(20),
        Validators.pattern(/^[A-Za-z][A-Za-z0-9_]*$/) 
      ]],
      email: ['', [
        Validators.required,
        Validators.email
      ]],
      password: ['', [
        Validators.required,
        Validators.minLength(8)
      ]],
      rePassword: ['', [Validators.required]],
    },
    { validators: this.passwordsMatchValidator() }
  );

  private passwordsMatchValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const password = control.get('password')?.value;
      const rePassword = control.get('rePassword')?.value;
      return password === rePassword ? null : { passwordsMismatch: true };
    };
  }
  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  toggleConfirmPasswordVisibility(): void {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

  onSubmit(): void {
    this.errorMessage = null;
    this.registerForm.markAllAsTouched();

    if (this.registerForm.invalid) {
      return; 
    }

    this.isLoading = true;
    const { username, email, password } = this.registerForm.value;

    this.authService.register({ username, email, password }).subscribe({
      next: () => {
        console.log('Registration successful');
      },
      error: (err: HttpErrorResponse) => {
        this.isLoading = false;
        this.errorMessage = err.error?.message || 'حدث خطأ أثناء التسجيل. يرجى المحاولة مرة أخرى.';
        console.error('Registration error:', err);
      },
      complete: () => {
        this.isLoading = false;
      }
    });
  }
}
