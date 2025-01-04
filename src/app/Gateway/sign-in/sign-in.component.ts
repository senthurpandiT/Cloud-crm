import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { HttpService } from '../../Services/http.service';
import { ErrorHandlerService } from '../../Services/errorhandler.service';
import { ProgressBarService } from '../../Services/progress.service';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './sign-in.component.html',
  styles: [],
})
export class SignInComponent {
  public router = window.location.pathname;
  LoginForm!: FormGroup;
  passwordHidden: boolean = true;
  isActivate: boolean = false;
  isTrue: boolean = false;
  password: string = '';
  isFormUp: boolean = false;
  isWrongEntry: boolean = false;
  constructor(
    private httpService: HttpService,
    private fb: FormBuilder,
    private errorHandler: ErrorHandlerService,
    private route: Router,
    public progressBarService: ProgressBarService
  ) {}
  async ngOnInit() {
    this.LoginForm = this.fb.group({
      emailId: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  loginSubmit() {
    if (this.LoginForm.invalid) {
      return;
    }
  }
}
