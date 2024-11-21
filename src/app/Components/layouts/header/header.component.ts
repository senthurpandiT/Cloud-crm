import { Component } from '@angular/core';
import { LanguageComponent } from "../../Shared/language.component";
import { CommonModule } from '@angular/common';
import { CommonService } from '../../../Services/common.service';
import { ProfileComponent } from "../../Shared/profile.component";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [LanguageComponent, CommonModule, ProfileComponent],
  templateUrl: './header.component.html',
  styles: ''
})
export class HeaderComponent {
  constructor(public common: CommonService) { }

}
