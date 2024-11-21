import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  key = '123';
  userData = 'USER_DATA'
  TokenData = 'JWT_TOKEN'
  UserType = 'USER_TYPE'
  private localStore = window.localStorage;

  constructor() { }

  public saveItem(token: string, userData: string, userType: string) {
    this.clearData();
    this.localStore.setItem(this.TokenData, token);
    this.localStore.setItem(this.userData, this.encrypt(JSON.stringify(userData)));
    this.localStore.setItem(this.UserType, userType);
  }

  public getUsertData(key: string) {
    let data = this.localStore.getItem(key);
    if (data) {
      return JSON.parse(this.decrypt(data));
    }
    return null;
  }

  public getParseItem(key: string) {
    let data = this.localStore.getItem(key);
    if (data) {
      return JSON.parse(data);
    }
    return null;
  }
  public geItem(key: string) {
    let data = this.localStore.getItem(key);
    if (data) {
      return data;
    }
    return null;
  }

  public removeData(key: string) {
    this.localStore.removeItem(key);
  }

  public clearData() {
    this.localStore.clear();
  }

  public isLoggedIn(key: string): boolean {
    const user = this.getUsertData(key);
    if (user) {
      return true;
    }

    return false;
  }

  encrypt(data: any) {
    const stringData = typeof data === 'string' ? data : data.toString();

    const encryptedData = CryptoJS.AES.encrypt(
      stringData,
      this.key
    ).toString();
    return encryptedData;
  }
  decrypt(encryptedData: any) {
    const decryptedData = CryptoJS.AES.decrypt(
      encryptedData,
      this.key
    ).toString(CryptoJS.enc.Utf8);
    return decryptedData;
  }
}
