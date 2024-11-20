import { Injectable } from '@angular/core';
import {
  ApiResponse,
  selectedLanguage,
} from '../Interfaces/validation-interfaces';
import { ErrorHandlerService } from './errorhandler.service';
import { AuthService } from '../Authentication/auth.service';
import { HttpService } from './http.service';
import { languages } from '../Interfaces/roles';

@Injectable({
  providedIn: 'root',
})
export class CommonService {
  LOGIN: any;
  languageList: any;
  selectedFlag = '';
  selectedLang: selectedLanguage | undefined;

  constructor(
    private errorHandler: ErrorHandlerService,
    private authService: AuthService,
    private httpService: HttpService
  ) {}

  getselectLanguage(langCode: string) {
    this.httpService.getOneLanguages(langCode).subscribe({
      next: (response: ApiResponse) => {
        const status: any = response.status;
        if (status.code == 200) {
          this.LOGIN = response.data.HOME;
        }
      },
      error: (err) => {
        this.errorHandler.handleError(err);
      },
      complete: () => {},
    });
  }

  getLanguage() {
    this.httpService.getLanguages().subscribe({
      next: async (response: ApiResponse) => {
        const status: any = response.status;
        if (status.code == 200) {
          this.languageList = await response.data;
          await this.setLanguage();
        }
      },
      error: (err) => {
        this.errorHandler.handleError(err);
      },
      complete: () => {},
    });
  }

  setLanguage(): Promise<any> {
    return new Promise((resolve, reject) => {
      const existLanguage: selectedLanguage =
        this.authService.geItem('currentlangauge');
      if (
        this.languageList &&
        this.languageList?.length > 0 &&
        existLanguage == null
      ) {
        this.languageList.map((data: selectedLanguage) => {
          if (data?.language == languages.English) {
            localStorage.setItem('currentlangauge', JSON.stringify(data));
            this.selectedLang = data;
            this.getselectLanguage(this.selectedLang?.code);
            resolve(data);
          }
        });
      } else if (this.LOGIN == undefined) {
        this.selectedLang = existLanguage;
        this.getselectLanguage(this.selectedLang?.code);
        resolve(existLanguage);
      }
    });
  }
}
