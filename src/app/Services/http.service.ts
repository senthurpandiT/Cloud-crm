import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { AppGlobals } from '../app.global';
import { ApiResponse, loginInterface } from '../Interfaces/validation-interfaces';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  headers = new HttpHeaders();
  constructor(
    private http: HttpClient,
    private appGlobals: AppGlobals,
  ) {
    this.headers.set('Content-Type', 'application/json');
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

  login(data: loginInterface) {
    return this.http.post<ApiResponse>(
      `${environment.apiUrl}${this.appGlobals.urls.LOGIN}`,
      data
    );
  }

  adminLogin(data: loginInterface) {
    return this.http.post<ApiResponse>(
      `${environment.apiUrl}${this.appGlobals.urls.ADMIN_LOGIN}`,
      data
    );
  }

  dashboardlist(data: any) {
    return this.http.post<ApiResponse>(`${environment.apiUrl}${this.appGlobals.urls.DASHBOARD}`, data);
  }

  statusList(status: any) {
    return this.http.post<ApiResponse>(`${environment.apiUrl}${this.appGlobals.urls.STATUS_LIST}`
      ,
      status
    );
  }

}
