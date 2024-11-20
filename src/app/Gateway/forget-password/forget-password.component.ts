import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProgressBarService } from '../../Services/progress.service';
import { RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { LanguageComponent } from "../../Services/language.component";
import { CommonService } from '../../Services/common.service';

@Component({
  selector: 'app-forget-password',
  standalone: true,
  imports: [CommonModule, RouterLink, ReactiveFormsModule, LanguageComponent],
  templateUrl: './forget-password.component.html',
  styles: ''
})
export class ForgetPasswordComponent {
  forgotForm!: FormGroup


  constructor(private fb: FormBuilder, public common: CommonService, public progressBarService: ProgressBarService) {

  }
  async ngOnInit() {
    this.forgotForm = this.fb.group({
      emailId: ['', [Validators.required, Validators.email]],
    });
    await this.common.getLanguage();
  }

  get email() {
    return this.forgotForm.get('emailId')!;
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
