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

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ProgressBarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  animations: [slideInAnimation],
})
export class AppComponent {
  title = 'ssit2';
  constructor(
    private contexts: ChildrenOutletContexts,
    private common: CommonService
  ) {}
  async ngOnInit() {
    if (this.common.languageList == undefined) {
      await this.common.getLanguage();
    }
  }

  getRouteAnimationData() {
    return this.contexts.getContext('primary')?.route?.snapshot?.data?.[
      'animation'
    ];
  }
}
