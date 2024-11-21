import { Component } from '@angular/core';
import { ChildrenOutletContexts, RouterOutlet } from '@angular/router';
import { HttpService } from './Services/http.service';
import { ErrorHandlerService } from './Services/errorhandler.service';
import { ProgressBarComponent } from './Services/progressbar.component';
import { ProgressBarService } from './Services/progress.service';
import {
  animate,
  group,
  query,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { slideInAnimation } from './Services/transition';
import { CommonService } from './Services/common.service';
import { AuthService } from './Authentication/auth.service';
import { HeaderComponent } from "./Components/layouts/header/header.component";
import { CommonModule } from '@angular/common';
import { SidebarComponent } from "./Components/layouts/sidebar/sidebar.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ProgressBarComponent, HeaderComponent, CommonModule, SidebarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  animations: [slideInAnimation],
})
export class AppComponent {
  router = window.location.pathname
  title = 'ssit2';
  constructor(
    private contexts: ChildrenOutletContexts,
    private common: CommonService, public authService: AuthService
  ) { }
  async ngOnInit() {
    console.log('App Component');

    // sessionStorage.setItem('currentlangauge', 'English')
    if (this.common.languageList == undefined) {
      await this.common.getAndSetLanguage();
    }
    const selectLang = await this.common.selectedLang
    console.log(selectLang, 'this.privilage');

  }

  getRouteAnimationData() {
    return this.contexts.getContext('primary')?.route?.snapshot?.data?.[
      'animation'
    ];
  }
}
