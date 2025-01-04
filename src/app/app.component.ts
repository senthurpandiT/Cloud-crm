import { Component } from '@angular/core';
import { ProgressBarComponent } from './Services/progressbar.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ProgressBarComponent, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  animations: [],
})
export class AppComponent {}
