import { Injectable, OnDestroy, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { AuthenticationFacade } from '../store/authentication.facade';

@Injectable({
  providedIn: 'root',
})
export class AuthViewService {
  signInForm!: UntypedFormGroup;
  signUpForm!: UntypedFormGroup;
  private destroy$ = new Subject<void>();
  passwordInput = this.signInForm?.get('password')?.value;
  confirmPasswordInput = this.signInForm?.get('confirmPassword')?.value;
  passwordStrength = this.signInForm?.get('passwordStrength')?.value;
  passwordStrengthBar = this.signInForm?.get('passwordStrengthBar')?.value;
  passwordHint = this.signInForm?.get('passwordHint')?.value;
  termsCheckbox = this.signInForm?.get('terms')?.value;
  submitBtn = this.signInForm?.get('submitBtn')?.value;
  form = this.signInForm?.get('signupForm')?.value;

  constructor(
    public fb: UntypedFormBuilder,
    public route: Router,
    public authFacade: AuthenticationFacade,
  ) {}

  onInit() {
    this.initSignInForm();
    this.initSignUpForm();
  }

  initSignInForm() {
    this.signInForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  initSignUpForm() {
    this.signUpForm = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', [Validators.required]],
      terms: [false, [Validators.requiredTrue]],
    });
  }

  // Password strength checker
  checkPasswordStrength(event: any) {
    let strength = 0;
    let password = event.target.value;
    if (password.length >= 8) strength++;
    if (password.length >= 12) strength++;
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength++;
    if (/\d/.test(password)) strength++;
    if (/[^a-zA-Z\d]/.test(password)) strength++;

    return strength;
  }

  // passwordInput.addEventListener('input', function() {
  //     const password = this.value;

  //     if (password.length > 0) {
  //         passwordStrength.classList.add('active');
  //         passwordHint.classList.add('active');

  //         const strength = checkPasswordStrength(password);
  //         passwordStrengthBar.className = 'password-strength-bar';

  //         if (strength <= 2) {
  //             passwordStrengthBar.classList.add('weak');
  //         } else if (strength <= 4) {
  //             passwordStrengthBar.classList.add('medium');
  //         } else {
  //             passwordStrengthBar.classList.add('strong');
  //         }
  //     } else {
  //         passwordStrength.classList.remove('active');
  //         passwordHint.classList.remove('active');
  //     }

  //     this.validateForm();
  // });

  onSignUpButtonClick() {
    const formValues = this.signUpForm.getRawValue();
    if (this.checkPasswordStrength(formValues.password) > 3) {
      console.log('Form Values:', formValues);
      this.authFacade.navigateTosignIn();
    }
    console.log('check Password Strength');
  }

  onSignInButtonClick() {
    console.log('Sign In Button Clicked');
    if (this.signInForm.valid) {
      const userName = this.signInForm.get('email')?.value;
      const passwd = this.signInForm.get('password')?.value;

      this.authFacade.doLogin(userName, passwd);
    }
    console.log("navigateToDashboard ")
    this.authFacade.navigateToDashboard();
    // this.route.navigate(['/todo-app/dashboard']);
  }

  onDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
