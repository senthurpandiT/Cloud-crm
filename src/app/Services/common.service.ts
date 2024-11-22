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
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CommonService {


  private dataSubject = new Subject<string>();
  data$ = this.dataSubject.asObservable();

  updateData(newValue: string) {
    this.dataSubject.next(newValue);
  }

  pathRouter = window.location.pathname
  userDetails: any;
  LOGIN: any;
  languageList: any;
  selectedFlag = '';
  selectedLang: selectedLanguage | undefined;

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
          this.updateData(langCode ? langCode : '');
          if (this.userDetails && this.userDetails?.privilage && this.userDetails?.privilage.length > 0) {
            let privilage = this.userDetails?.privilage
            console.log(privilage);

            privilage = this.removeObjectsWithAllZeroActions(
              privilage
            );

            privilage = this.filterByLanguage(privilage, langCode)
            this.LOGIN.PRIVILAGES = privilage
            console.log(this.LOGIN);

          }

        }
      },
      error: (err) => {
        this.errorHandler.handleError(err);
      },
      complete: () => { },
    });
  }


  filterByLanguage(data: Array<any>, languageCode: string | undefined) {
    if (!languageCode) return;

    const filterProperties = (item: any) => {
      const filteredItem: any = { ...item };
      Object.keys(filteredItem).forEach((key) => {
        if (!['Rp', 'submenu', 'type', 'icon', 'id', 'module_name', 'order_number', 'parent_id', 'front_router'].includes(key) && key !== languageCode) {
          delete filteredItem[key];
        }
      });
      filteredItem.module_name = filteredItem[languageCode];
      return filteredItem;
    };

    return data.map(module => {
      const filteredModule = filterProperties(module);

      if (filteredModule.submenu) {
        filteredModule.submenu = filteredModule.submenu.map(filterProperties);
      }
      return filteredModule;
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
          if (this.userDetails && this.userDetails?.role &&
            this.userDetails?.role != Roles.Admin &&
            this.userDetails?.role != Roles.ProjectManager
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
