import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root',
})
export class LocalstorageService {
  key = '123';
  private localStore = window.localStorage;

  constructor() {}

  public saveData(key: string, value: string) {
    this.removeData(key);
    this.localStore.setItem(key, this.encrypt(JSON.stringify(value)));
  }

  public getData(key: string) {
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
    const user = this.getData(key);
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
