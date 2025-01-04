import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { ProgressBarService } from '../../Services/progress.service';
import { ConfirmPasswordValidator } from '../../Authentication/validation';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './sign-up.component.html',
  styles: '',
})
export class SignUpComponent {
  signUpForm!: FormGroup;
  passwordHidden: boolean = true;
  confirmPasswordHidden: boolean = true;
  logoUrl: any;
  constructor(
    private fb: FormBuilder,
    public progressBarService: ProgressBarService
  ) {}

  async ngOnInit() {
    this.signUpForm = this.fb.group(
      {
        firstname: ['', [Validators.required]],
        lastname: ['', [Validators.required]],
        companyname: ['', [Validators.required]],
        phone: ['', []],
        emailId: ['', [Validators.required, Validators.email]],
        password: [
          '',
          [
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(40),
            Validators.pattern(
              /^(?=.*[A-Z]).*(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-])/
            ),
          ],
        ],
        confirmPassword: ['', Validators.required],
        acceptTerms: [false, Validators.requiredTrue],
      },

      {
        validator: ConfirmPasswordValidator('password', 'confirmPassword'),
      }
    );
  }

  get firstname() {
    return this.signUpForm.get('firstname')!;
  }

  get lastname() {
    return this.signUpForm.get('lastname')!;
  }
  get companyname() {
    return this.signUpForm.get('companyname')!;
  }
  get phone() {
    return this.signUpForm.get('phone')!;
  }
  get email() {
    return this.signUpForm.get('emailId')!;
  }

  get password() {
    return this.signUpForm.get('password')!;
  }

  get confirmPassword() {
    return this.signUpForm.get('confirmPassword')!;
  }
  get acceptTerms() {
    return this.signUpForm.get('acceptTerms')!;
  }

  valiadateReturn(value: AbstractControl) {
    return value.invalid && (value.dirty || value.touched);
  }

  registerSubmit() {
    if (this.signUpForm.invalid) {
      for (const control of Object.keys(this.signUpForm.controls)) {
        this.signUpForm.controls[control].markAsTouched();
      }
      return;
    }
  }
}
