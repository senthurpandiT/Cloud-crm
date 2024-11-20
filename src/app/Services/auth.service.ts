import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  key = '123';
  private localStore = window.localStorage;

  constructor() { }

  public saveItem(key: string, value: string) {
    this.clearData();
    this.localStore.setItem(key, JSON.stringify(value));
  }

  public geItem(key: string) {
    let data = this.localStore.getItem(key);
    if (data) {
      return JSON.parse(data);
    }
    return null;
  }


  public saveUserData(key: string, value: string) {
    this.clearData();
    this.localStore.setItem(key, this.encrypt(JSON.stringify(value)));
  }

  public getUsertData(key: string) {
    let data = this.localStore.getItem(key);
    if (data) {
      return this.decrypt(JSON.parse(data));
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

  private encrypt(txtToEncrypt: string): string {
    return CryptoJS.AES.encrypt(txtToEncrypt, this.key).toString();
  }

  private decrypt(txtToDecrypt: string) {
    return CryptoJS.AES.decrypt(txtToDecrypt, this.key).toString(
      CryptoJS.enc.Utf8
    );
  }
}
