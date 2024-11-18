import { Component } from '@angular/core';
import { CommonService } from '../../../Services/common.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css',
})
export class SignInComponent {
  LOGIN: any;
  public router = window.location.pathname;
  constructor(public common: CommonService) {}
  async ngOnInit() {
    this.LOGIN = await this.common.getselectLanguage('en');
    console.log(this.LOGIN);
  }
}
