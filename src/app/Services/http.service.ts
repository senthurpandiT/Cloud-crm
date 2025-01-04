import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { AppGlobals } from '../app.global';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  headers = new HttpHeaders();
  constructor(private http: HttpClient, private appGlobals: AppGlobals) {}

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
}
