import { Component } from '@angular/core';
import { CommonService } from '../../../Services/common.service';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ErrorHandlerService } from '../../../Services/errorhandler.service';
import { ApiResponse } from '../../../Interfaces/validation-interfaces';
import { Roles } from '../../../Interfaces/roles';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [RouterLink, CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css',
})
export class SignInComponent {
  LOGIN: any;
  public router = window.location.pathname;
  LoginForm!: FormGroup;
  passwordHidden: boolean = true;
  isLoading: boolean = false;
  languageList: any;
  selectedFlag = '';
  selectedLang: any;
  isActivate: boolean = false;
  isTrue: boolean = false;
  constructor(
    public common: CommonService,
    private fb: FormBuilder,
    private errorHandler: ErrorHandlerService,
    private route: Router
  ) {}
  async ngOnInit() {
    this.LoginForm = this.fb.group({
      emailId: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
    this.languageList = await this.common.getLanguage();
    this.selectedLang = await this.common.setLanguage(this.languageList, '');
    this.LOGIN = await this.common.getselectLanguage(this.selectedLang?.code);
  }

  get email() {
    return this.LoginForm.get('emailId')!;
  }

  get password() {
    return this.LoginForm.get('password')!;
  }

  togglePasswordVisibility() {
    this.passwordHidden = !this.passwordHidden;
  }

  async langugaeSelected(lang: any) {
    this.selectedLang = lang;
    localStorage.setItem('currentlangauge', JSON.stringify(lang));
    this.LOGIN = await this.common.getselectLanguage(this.selectedLang?.code);
  }

  loginSubmit() {
    if (this.LoginForm.invalid) {
      for (const control of Object.keys(this.LoginForm.controls)) {
        this.LoginForm.controls[control].markAsTouched();
      }
      return;
    }
    this.isLoading = true;
    let loginval = {
      emailId: this.LoginForm.value.emailId,
      password: this.LoginForm.value.password,
    };

    this.common.login(loginval).subscribe({
      next: (response: ApiResponse) => {
        const status: any = response.status;
        if (status.code == 200) {
          const loginRes = response.data;
          let askRole = '';
          let contactadmin = '';
          if (askRole == Roles.Admin) {
            askRole = Roles.SuperAdmin;
            contactadmin = 'our';
          } else {
            askRole = Roles.Admin;
            contactadmin = 'your';
          }
          if (response && response.data) {
            switch (true) {
              case response.data.is_active === true &&
                response.data.email_verified === true:
                switch (response.data.business_account.status) {
                  case 'Approval':
                    this.isActivate = true;
                    break;

                  case 'Yes plan':
                    console.log(response);
                    // this.fn.setLocalStorage(response);
                    break;

                  case 'No plan':
                    // this.fn.setLocalStorage(response);
                    this.route.navigateByUrl('/subscription');
                    break;

                  case 'deactivated':
                    // this.fn.showAlert(
                    //   `Your account was deactivated, please contact ${contactadmin} ${askRole}`,
                    //   'Activation required',
                    //   'Ok'
                    // );
                    break;

                  case 'Rejected':
                    // this.fn.showAlert(
                    //   `Your account was Rejected, please contact our ${askRole}`,
                    //   'Activation required',
                    //   'Ok'
                    // );
                    break;

                  default:
                    console.error(
                      'Unexpected status:',
                      response.data.business_account.status
                    );
                    break;
                }
                break;

              case response.data.email_verified === false:
                this.isTrue = true;
                break;

              case response.data.is_active === false:
                // this.fn.showAlert(
                //   `Your account was inactive, please contact our ${askRole}`,
                //   'Account is inactive',
                //   'Ok'
                // );
                break;

              default:
                console.error('Unexpected condition');
                break;
            }
          }

          this.isLoading = false;
        }
      },
      error: (err) => {
        this.errorHandler.handleError(err);
      },
      complete: () => {},
    });
  }
}
