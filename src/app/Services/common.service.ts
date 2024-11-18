import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { AppGlobals } from '../app.global';
import { ApiResponse } from '../Interfaces/validation-interfaces';
import { ErrorHandlerService } from './errorhandler.service';

@Injectable({
  providedIn: 'root',
})
export class CommonService {
  headers = new HttpHeaders();
  constructor(
    private http: HttpClient,
    private appGlobals: AppGlobals,
    private errorHandler: ErrorHandlerService
  ) {
    this.headers.set('Content-Type', 'application/json');
  }

  getselectLanguage(lang: any): Promise<any> {
    return new Promise((res, rej) => {
      this.getOneLanguages(lang).subscribe({
        next: (response: ApiResponse) => {
          const status: any = response.status;
          if (status.code == 200) {
            const langageRes = response.data.HOME;
            // this.translate.setTranslation(lang, this.langageRes);
            // this.translate.use(lang);
            res(langageRes);
          }
        },
        error: (err) => {
          this.errorHandler.handleError(err);
          rej(err);
        },
        complete: () => {},
      });
    });
  }

  getLanguage(): Promise<any> {
    return new Promise((res, rej) => {
      this.getLanguages().subscribe({
        next: (response: ApiResponse) => {
          const status: any = response.status;
          if (status.code == 200) {
            const langList = response.data;
            //for timezone intially call
            // if (this.logoutlang === null) {
            //   this.timezoneData();
            // }

            // //for timezone intially call
            // this.common.editLanguage(this.languageList);
            // this.languageList.forEach((element: any) => {
            //   let code = this.ls.getItem('currentlangauge');
            //   let getcur = code?.id;
            //   if (getcur) {
            //     if (element.id == getcur) {
            //       this.language = element;
            //       this.langugaeSelected(element);
            //     }
            //   } else {
            //     if (element.id == this.getlang) {
            //       this.language = element;
            //       this.langugaeSelected(element);
            //     }
            //   }
            // });
            res(langList);
          }
        },
        error: (err) => {
          this.errorHandler.handleError(err);
          rej(err);
        },
        complete: () => {},
      });
    });
  }

  setLanguage(languageList: any, langInput: any): Promise<any> {
    return new Promise((resolve, reject) => {
      if (languageList && languageList?.length > 0) {
        languageList.map(async (data: any) => {
          if (langInput == '' && data?.language === 'English') {
            await localStorage.setItem('currentlangauge', JSON.stringify(data));
            resolve(data);
          } else {
            if (data.id == langInput) {
              // this.language = data;
              localStorage.setItem('currentlangauge', data);
            }
          }
        });
      }
    });
  }
  postRequest(url: string, requestData: any) {
    let httpData = this.http.post(`${environment.apiUrl}${url}`, requestData);

    return httpData;
  }
  postRequestNew(url: string, requestData: any, headers: any) {
    return this.http.post(`${environment.apiUrl}${url}`, requestData, headers);
  }

  getRequest(url: string) {
    return;
  }
  patchRequest(url: string, requestData: any) {
    return this.http.patch(`${environment.apiUrl}${url}`, requestData);
  }

  getOneLanguages(languageCode: any) {
    const url = `${this.appGlobals.urls.GET_ONE_LANGUAGE}/${languageCode}`;
    return this.http.get(`${environment.apiUrl}${url}`);
  }
  getLanguages() {
    return this.http.get(
      `${environment.apiUrl}${this.appGlobals.urls.LANGUAGE_LIST}`
    );
  }
  login(data: any) {
    return this.http.post(
      `${environment.apiUrl}${this.appGlobals.urls.LOGIN}`,
      data
    );
  }
  adminLogin(data: any) {
    return this.http.post(
      `${environment.apiUrl}${this.appGlobals.urls.ADMIN_LOGIN}`,
      data
    );
  }
}
