import { Component } from '@angular/core';
import { CommonService } from '../../../Services/common.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [],
  templateUrl: './dashboard.component.html',
  styles: ''
})
export class DashboardComponent {
  constructor(public common: CommonService) { }

}
