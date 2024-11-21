import { Injectable } from '@angular/core';
import {
  ApiResponse,
  selectedLanguage,
} from '../Interfaces/validation-interfaces';
import { ErrorHandlerService } from './errorhandler.service';
import { AuthService } from '../Authentication/auth.service';
import { HttpService } from './http.service';
import { frequentVariables, languages, Roles } from '../Interfaces/roles';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class CommonService {
  userDetails: any;
  LOGIN: any;
  languageList: any;
  selectedFlag = '';
  selectedLang: selectedLanguage | undefined;
  rolebased: string = '';

  constructor(
    private errorHandler: ErrorHandlerService,
    private authService: AuthService,
    private httpService: HttpService,
    private router: Router
  ) { }

  translateLanguage(langCode: string | undefined) {

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
      complete: () => { },
    });
  }

  getAndSetLanguage(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.httpService.getLanguages().subscribe({
        next: async (response: ApiResponse) => {
          const status: any = response.status;
          if (status.code == 200) {
            this.languageList = await response.data;
            const existLanguage: selectedLanguage = this.authService.getParseItem(frequentVariables.declaredLslangauge);

            if (this.languageList && this.languageList?.length > 0) {
              let languageData;

              if (existLanguage == null) {
                languageData = this.languageList.find((data: selectedLanguage) => data?.language === languages.English);
                if (languageData) {
                  localStorage.setItem(frequentVariables.declaredLslangauge, JSON.stringify(languageData));
                  this.selectedLang = languageData;
                }
              } else {
                this.selectedLang = existLanguage;
              }
              this.translateLanguage(this.selectedLang?.code);
              resolve(this.selectedLang);

            } else {
              reject('No languages available');
            }
          }
        },
        error: (err) => {
          this.errorHandler.handleError(err);
          reject(err);
        },
        complete: () => { },
      });
    });
  }





  imageFile(data: any, link: string) {
    if (data && (data == 2 || data == '2')) {
      return `${environment.imageapiurl}${link}`;
    } else if (data && (data == 1 || data == '1')) {
      return `${environment.imgURL}${link}`;
    } else {
      return `${environment.imgURL}${link}`;
    }
  }


  removeObjectsWithAllZeroActions(privilegeArray: any[]): any[] {
    if (privilegeArray && privilegeArray.length > 0) {
      return privilegeArray
        .map((item) => {
          if (item.submenu) {
            item.submenu = this.removeObjectsWithAllZeroActions(item.submenu);
          }

          if (this.userDetails) {
            this.rolebased = this.userDetails?.role;
          } else {
          }

          if (
            this.rolebased != Roles.Admin &&
            this.rolebased != Roles.ProjectManager
          ) {
            if (
              item.Rp === null &&
              item.type === 'Page' &&
              (item.module_name === 'Checklist Template' ||
                item.module_name === 'Status' ||
                item.module_name === 'Workflow' ||
                item.module_name === 'Contact type')
            ) {
              return null;
            }
          }
          if (item.Rp !== null) {
            const actions = item.Rp.actions;
            const allZero = Object.values(actions).every(
              (value) => value === 0
            );

            if (allZero || actions.view === 0) {
              return null;
            }
          }
          return item;
        })
        .filter((item) => item !== null);
    } else {
      return [];
    }
  }

  setLocalStorage(response: any) {
    this.authService.saveItem(response.session?.token, response.data
      , 'User'
    );
    this.LOGIN = undefined
    const languageData: selectedLanguage = this.languageList.find((data: selectedLanguage) => data?.code === response.data.languagecode);
    if (languageData) {
      localStorage.setItem(frequentVariables.declaredLslangauge, JSON.stringify(languageData));
      this.getAndSetLanguage();
    }
    this.userDetails = this.authService.getUsertData(this.authService.userData)

    this.selectedLang ?? this.getAndSetLanguage()

    let privilage = this.userDetails?.privilage;

    privilage = this.removeObjectsWithAllZeroActions(
      privilage
    );

    if (privilage && privilage.length > 0) {
      const firstRoute = privilage[0];

      this.router.navigateByUrl(firstRoute.front_router);
    }
    // this.toastr.success(response?.status?.message, '', {
    //   closeButton: true,
    //   timeOut: 4000,
    // });
  }


}
