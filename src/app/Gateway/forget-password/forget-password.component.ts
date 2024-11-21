import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProgressBarService } from '../../Services/progress.service';
import { RouterLink } from '@angular/router';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonService } from '../../Services/common.service';
import { LanguageComponent } from '../../Components/Shared/language.component';
import { frequentVariables, routePath } from '../../Interfaces/roles';

@Component({
  selector: 'app-forget-password',
  standalone: true,
  imports: [CommonModule, RouterLink, ReactiveFormsModule, LanguageComponent],
  templateUrl: './forget-password.component.html',
  styles: '',
})
export class ForgetPasswordComponent {
  forgotForm!: FormGroup;
  logoUrl: string = frequentVariables.logoUrl
  routerRedirect = routePath
  constructor(
    private fb: FormBuilder,
    public common: CommonService,
    public progressBarService: ProgressBarService
  ) { }
  async ngOnInit() {
    this.forgotForm = this.fb.group({
      emailId: ['', [Validators.required, Validators.email]],
    });
  }

  get email() {
    return this.forgotForm.get('emailId')!;
  }

  valiadateReturn(value: AbstractControl) {
    return value.invalid &&
      (value.dirty || value.touched)
  }

  forgotSubmit() {
    if (this.forgotForm.invalid) {
      for (const control of Object.keys(this.forgotForm.controls)) {
        this.forgotForm.controls[control].markAsTouched();
      }
      return;
    }
  }
}
