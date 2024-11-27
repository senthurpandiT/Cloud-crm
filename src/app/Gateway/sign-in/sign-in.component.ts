import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  AbstractControl,
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
import { frequentVariables, Roles, routePath } from '../../Interfaces/roles';
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
  styles: `*,
  *:after,
  *:before {
    box-sizing: border-box;
  }
  
  body {
    background: #FF4081/1.25;
    text-align: center;
    font-family: 'Roboto', sans-serif;
  }
  
  .panda {
    position: relative;
    width: 200px;
    margin: 50px auto;
  }
  
  .face {
    width: 200px;
    height: 200px;
    background: #fff;
    border-radius: 100%;
    margin: 50px auto;
    box-shadow: 0 10px 15px rgba(0, 0, 0, .15);
    z-index: 50;
    position: relative;
  }
  
  .ear {
    position: absolute;
    width: 80px;
    height: 80px;
    background: #000;
    z-index: 5;
    border: 10px solid #fff;
    left: -15px;
    top: -15px;
    border-radius: 100%;
  }
  
  .ear:after {
    content: '';
    position: absolute;
    width: 80px;
    height: 80px;
    background: #000;
    z-index: 5;
    border: 10px solid #fff;
    left: 125px;
    top: -15px;
    border-radius: 100%;
  }
  
  .eye-shade {
    background: #000;
    width: 50px;
    height: 80px;
    margin: 10px;
    position: absolute;
    top: 35px;
    left: 25px;
    transform: rotate(220deg);
    border-radius: 25px 20px 30px 35px;
  
  }
  
  .eye-shade.rgt {
    transform: rotate(140deg);
    left: 105px;
  }
  
  .eye-white {
    position: absolute;
    width: 30px;
    height: 30px;
    border-radius: 100%;
    background: #fff;
    z-index: 500;
    left: 40px;
    top: 80px;
    overflow: hidden;
  }
  
  .eye-white.rgt {
    right: 40px;
    left: auto;
  }
  
  .eye-ball {
    position: absolute;
    width: 0;
    height: 0;
    left: 20px;
    top: 20px;
    max-width: 10px;
    max-height: 10px;
    transition: .1s;
  }
  
  .eye-ball:after {
    content: '';
    background: #000;
    position: absolute;
    border-radius: 100%;
    right: 0;
    bottom: 0;
    width: 20px;
    height: 20px;
  }
  
  .nose {
    position: absolute;
    height: 20px;
    width: 35px;
    bottom: 40px;
    left: 0;
    right: 0;
    margin: auto;
    border-radius: 50px 20px 30px 15px;
    transform: rotate(15deg);
    background: #000;
  }
  
  .body {
    background: #fff;
    position: absolute;
    top: 200px;
    left: -20px;
    border-radius: 100px 100px 100px 100px / 126px 126px 96px 96px;
    width: 250px;
    height: 282px;
    box-shadow: 0 5px 10px rgba(0, 0, 0, .3);
  }
  
  .hand {
    width: 40px;
    height: 30px;
    border-radius: 50px;
    box-shadow: 0 2px 3px rgba(0, 0, 0, .15);
    background: #000;
    margin: 5px;
    position: absolute;
    top: 70px;
    left: -25px;
  }
  
  .hand:after,
  .hand:before {
    content: '';
    position: absolute;
    width: 40px;
    height: 30px;
    border-radius: 50px;
    box-shadow: 0 2px 3px rgba(0, 0, 0, .15);
    background: #000;
    left: -5px;
    top: 11px;
  }
  
  .hand:before {
    top: 26px;
  }
  
  .hand.rgt {
    left: auto;
    right: -25px;
  }
  
  .hand.rgt:after,
  .hand.rgt:before {
    left: auto;
    right: -5px;
  }
  
  .foot {
    top: 414px;
    left: -80px;
    position: absolute;
    background: #000;
    z-index: 1400;
    box-shadow: 0 5px 5px rgba(0, 0, 0, .2);
    border-radius: 40px 40px 39px 40px / 26px 26px 63px 63px;
    width: 82px;
    height: 120px;
  }
  
  .foot:after {
    content: '';
    width: 55px;
    height: 65px;
    background: #222;
    border-radius: 100%;
    position: absolute;
    bottom: 10px;
    left: 0;
    right: 0;
    margin: auto;
  }
  
  .finger {
    position: absolute;
    width: 25px;
    height: 35px;
    background: #222;
    border-radius: 100%;
    top: 10px;
    right: 5px;
  }
  
  .finger:after,
  .finger:before {
    content: '';
    position: absolute;
    width: 20px;
    height: 35px;
    background: #222;
    border-radius: 100%;
    right: 30px;
    top: 0;
  }
  
  .finger:before {
    right: 55px;
    top: 5px;
  }
  
  .foot.rgt {
    left: auto;
    right: -80px;
  }
  
  .foot.rgt .finger {
    left: 5px;
    right: auto;
  }
  
  .foot.rgt .finger:after {
    left: 30px;
    right: auto;
  }
  
  .foot.rgt .finger:before {
    left: 55px;
    right: auto;
  }
  
  form {
    display: none;
    max-width: 400px;
    padding: 20px 40px;
    background: #fff;
    height: 350px;
    margin: auto;
    display: block;
    box-shadow: 0 10px 15px rgba(0, 0, 0, .15);
    transition: .3s;
    position: relative;
    transform: translateY(-100px);
    z-index: 500;
    border: 1px solid #eee;
  }
  
  form.up {
    transform: translateY(-180px);
  }
  
  h1 {
    color: #FF4081;
    font-family: 'Dancing Script', cursive;
  }
  
  .btn {
    background: #fff;
    padding: 5px;
    width: 150px;
    height: 35px;
    border: 1px solid #FF4081;
    margin-top: 25px;
    cursor: pointer;
    transition: .3s;
    box-shadow: 0 50px #FF4081 inset;
    color: #fff;
  }
  
  .btn:hover {
    box-shadow: 0 0 #FF4081 inset;
    color: #FF4081;
  }
  
  .btn:focus {
    outline: none;
  }
  
  .form-group {
    position: relative;
    font-size: 15px;
    color: #666;
  }
  
  .form-group + .form-group {
    margin-top: 30px;
  }
  
  .form-label {
    position: absolute;
    z-index: 1;
    left: 0;
    top: 5px;
    transition: .3s;
  }
  
  .form-control {
    width: 100%;
    position: relative;
    z-index: 3;
    height: 35px;
    background: none;
    border: none;
    padding: 5px 0;
    transition: .3s;
    border-bottom: 1px solid #777;
    color: #555;
  }
  
  .form-control:invalid {
    outline: none;
  }
  
  .form-control:focus,
  .form-control:valid {
    outline: none;
    box-shadow: 0 1px #FF4081;
    border-color: #FF4081;
  }
  
  .form-control:focus + .form-label,
  .form-control:valid + .form-label {
    font-size: 12px;
    color: #FF4081;
    transform: translateY(-15px);
  }
  
  form.up {
    transform: translateY(-180px);
    transition: transform 0.3s;
  }
  
  .alert {
    color: #f00;
    font-size: 16px;
    position: absolute;
    top: -300px;
    right: -180px;
    padding: 30px 25px;
    background: #ffadad;
    border-radius: 50%;
    opacity: 0;
    transform: scale(0);
    transition: opacity 0.4s, transform 0.4s;
  }
  
  .alert.ng-trigger {
    opacity: 1;
    transform: scale(1);
  }
  
 
  .wrong-entry {
    animation: wrong-log 0.3s;
  }
  
  @keyframes wrong-log {
    0%, 100% {
      left: 0;
    }
    20%, 60% {
      left: 20px;
    }
    40%, 80% {
      left: -20px;
    }
  }
  
  @keyframes eye-blink {
    to {
      height: 30px;
    }
  }
  
  .alert:after,
  .alert:before {
    content: '';
    position: absolute;
    width: 25px;
    height: 25px;
    border-radius: 50%;
    background: #ffadad;
    left: -19px;
    bottom: -8px;
   
  }
  
  input:-webkit-autofill, textarea:-webkit-autofill {
    background-color: transparent !important;
    color: #000; /* Make sure text color is not impacted */
    box-shadow: 0 0 0px 1000px transparent inset !important; /* Remove shadow effect of autofill */
    transition: background-color 5000s ease-in-out 0s !important;
    }

    h1 {
    font-size: 25px !important;
}
    `,
})
export class SignInComponent {
  public router = window.location.pathname;
  LoginForm!: FormGroup;
  passwordHidden: boolean = true;
  isActivate: boolean = false;
  isTrue: boolean = false;
  logoUrl: string = frequentVariables.logoUrl
  routerRedirect = routePath;
  password: string = '';
  isFormUp: boolean = false;
  isWrongEntry: boolean = false;
  constructor(
    private httpService: HttpService,
    private fb: FormBuilder,
    private errorHandler: ErrorHandlerService,
    private route: Router,
    public progressBarService: ProgressBarService,
    public common: CommonService
  ) { }
  async ngOnInit() {
    this.LoginForm = this.fb.group({
      emailId: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  loginSubmit() {

    if (this.LoginForm.invalid) {
      this.isWrongEntry = true;
      setTimeout(() => {
        this.isWrongEntry = false;
      }, 500)
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
                    this.common.setLocalStorage(response);
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
      complete: () => { },
    });
  }



  onFocusIn() {
    this.isFormUp = true;
  }

  // Focus Out: Remove 'up' class
  onFocusOut() {
    this.isFormUp = false;
  }

  // Panda Eye Move: Track mouse movement
  @HostListener('document:mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {
    const dw = window.innerWidth / 15;
    const dh = window.innerHeight / 15;
    const x = event.pageX / dw;
    const y = event.pageY / dh;
    const eyeBalls = document.querySelectorAll('.eye-ball');
    eyeBalls.forEach((eyeBall: any) => {
      eyeBall.style.width = `${x}px`;
      eyeBall.style.height = `${y}px`;
    });
  }
}
