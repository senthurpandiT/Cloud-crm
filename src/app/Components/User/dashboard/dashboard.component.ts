import { Component } from '@angular/core';
import { CommonService } from '../../../Services/common.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ApiResponse, selectedLanguage } from '../../../Interfaces/validation-interfaces';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { HttpService } from '../../../Services/http.service';
import { AuthService } from '../../../Authentication/auth.service';
import { frequentVariables } from '../../../Interfaces/roles';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink, TranslateModule],
  templateUrl: './dashboard.component.html',
  styles: ''
})
export class DashboardComponent {
  errorMsg: any;
  dashboard: any;
  status: any;
  lang: selectedLanguage | undefined;
  constructor(public common: CommonService, private httpService: HttpService, private translate: TranslateService, private authservice: AuthService) { }
  async ngOnInit() {
    // this.lang = await this.authservice.getParseItem(frequentVariables.declaredLslangauge)
    // await this.getdashboardlist(this.lang ? this.lang?.code : '')
    this.common.data$.subscribe((data) => {
      this.getdashboardlist(data ? data : '')
    })
  }


  getdashboardlist(lang: string) {
    let getData = {
      language: lang,
    };

    this.httpService.dashboardlist(getData).subscribe({
      next: (response: ApiResponse) => {
        const status: any = response.status;
        if (status.code == 200) {
          // this.isLoading = false;
          this.dashboard = response.data;
        }
      },
      error: (err) => {
        const error: any = err.error.status;
        if (error.code == 400) {
          // this.isLoading = false;

          this.errorMsg = error.message;
        }
        if (error.code == 500) {
          // this.isLoading = false;

          this.errorMsg = 'Server unavailable !';
        }
      },
      complete: () => { },
    });
  }
  getStatusList(data: any) {
    this.httpService.statusList(data).subscribe({
      next: (response: ApiResponse) => {
        const status: any = response.status;
        if (status.code == 200) {
          this.status = response.data;
          // this.common.getStatus(this.statusListArray);
        }
      },
      error: (err) => {
        const error: any = err.error.status;
        if (error.code == 400) {
          this.errorMsg = error.message;
          // this.toastr.error(this.errorMsg);
        }
        if (error.code == 500) {
          this.errorMsg = 'Server unavailable !';
        }
      },
      complete: () => { },
    });
  }

  getStatusValue(statusId: string): string {
    const status = this.status.find((s: any) => s.id.toString() === statusId);
    return status ? status.value : '';
  }
  getStatusClass(statusId: string): string {
    const baseClass = 'bg-label-';
    if (!statusId) {
      return '';
    }

    const colors = ['danger', 'primary', 'info', 'success'];

    // Convert statusId to number and get the color index
    const status = this.status.find((s: any) => s.id.toString() === statusId);
    const statusNum = parseInt(status?.id, 10);
    const colorIndex = statusNum % colors.length;
    return baseClass + colors[colorIndex];
  }

  isStatusEmpty(status: any): boolean {
    return status === null || status === undefined || status === '';
  }

}
