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
  langageRes = [];
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
            this.langageRes = response.data.HOME;
            // this.translate.setTranslation(lang, this.langageRes);
            // this.translate.use(lang);
            res(this.langageRes);
          }
        },
        error: (err) => {
          this.errorHandler.handleError(err);
          rej();
        },
        complete: () => {},
      });
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
}
