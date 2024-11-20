import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { HttpService } from '../../Services/http.service';
import { ErrorHandlerService } from '../../Services/errorhandler.service';
import {
  ApiResponse,
  loginInterface,
} from '../../Interfaces/validation-interfaces';
import { Roles } from '../../Interfaces/roles';
import { ProgressBarService } from '../../Services/progress.service';
import { CommonService } from '../../Services/common.service';
import { LanguageComponent } from '../../Components/Shared/language.component';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [
    RouterLink,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    LanguageComponent,
  ],
  templateUrl: './sign-in.component.html',
  styles: '',
})
export class SignInComponent {
  public router = window.location.pathname;
  LoginForm!: FormGroup;
  passwordHidden: boolean = true;
  isActivate: boolean = false;
  isTrue: boolean = false;
  constructor(
    private httpService: HttpService,
    private fb: FormBuilder,
    private errorHandler: ErrorHandlerService,
    private route: Router,
    public progressBarService: ProgressBarService,
    public common: CommonService
  ) {}
  async ngOnInit() {
    this.LoginForm = this.fb.group({
      emailId: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
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

  loginSubmit(LoginForm: FormGroup) {
    console.log(LoginForm);

    if (this.LoginForm.invalid) {
      for (const control of Object.keys(this.LoginForm.controls)) {
        this.LoginForm.controls[control].markAsTouched();
      }
      return;
    }
    const loginval: loginInterface = {
      emailId: this.LoginForm.value.emailId,
      password: this.LoginForm.value.password,
    };
    this.httpService.login(loginval).subscribe({
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
        }
      },
      error: (err) => {
        this.errorHandler.handleError(err);
      },
      complete: () => {},
    });
  }
}
