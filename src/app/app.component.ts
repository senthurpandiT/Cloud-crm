import { Component } from '@angular/core';
import { ChildrenOutletContexts, NavigationEnd, Router, RouterOutlet } from '@angular/router';
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
import { Roles } from './Interfaces/roles';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ProgressBarComponent, HeaderComponent, CommonModule, SidebarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  animations: [slideInAnimation],
})
export class AppComponent {
  routerPath: string = ''
  title = 'ssit2';
  Roles = Roles
  constructor(
    private contexts: ChildrenOutletContexts,
    public common: CommonService, public authService: AuthService, private router: Router
  ) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.routerPath = event.url
        console.log(this.routerPath, 'App Component');

      }
    });
  }
  async ngOnInit() {

    // sessionStorage.setItem('currentlangauge', 'English')
    if (this.common.languageList == undefined) {
      await this.common.getAndSetLanguage();
    }

  }

  getRouteAnimationData() {
    return this.contexts.getContext('primary')?.route?.snapshot?.data?.[
      'animation'
    ];
  }
}
