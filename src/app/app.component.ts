import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonService } from './Services/common.service';
import { ApiResponse } from './Interfaces/validation-interfaces';
import { ErrorHandlerService } from './Services/errorhandler.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'ssit2';
  constructor(
    private common: CommonService,
    private errorHandler: ErrorHandlerService
  ) {}
  ngOnInit() {}
}
