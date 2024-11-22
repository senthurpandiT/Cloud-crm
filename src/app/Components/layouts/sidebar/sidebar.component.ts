import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterModule } from '@angular/router';
import { CommonService } from '../../../Services/common.service';
import { frequentVariables, Roles, routePath } from '../../../Interfaces/roles';
import { selectedLanguage } from '../../../Interfaces/validation-interfaces';
import { AuthService } from '../../../Authentication/auth.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterModule],
  templateUrl: './sidebar.component.html',
  styles: ''
})
export class SidebarComponent {
  selectedLang: string = '';
  privilage: Array<any> = []
  logoUrl: string = frequentVariables.logoUrl
  routerRedirect = routePath
  Roles = Roles
  archive: any[] = [
    {
      id: 999,
      module_name: 'Archive',
      front_router: '/',
      type: 'Main',
      en: 'Archive',
      pt: 'Painel',
      fr: 'Tableau de bord',
      fi: 'Kojelauta',
      da: 'Dashboard',
      Rp: null,
      submenu: [
        {
          id: 98,
          module_name: 'Arch-Projects',
          front_router: '/Arch-project-list',
          type: 'Main',
          en: 'Projects',
          pt: 'Funções',
          fr: 'Les rôles',
          fi: 'Roolit',
          da: 'Roller',
          icon: 'fa-folder-open fa-regular ',
          Rp: {
            actions: {
              add: 1,
              edit: 1,
              view: 1,
              delete: 1,
            },
          },
        },
      ],
    },
  ];
  constructor(public common: CommonService, private authService: AuthService) { }

  async ngOnInit() {
    let privilage = this.common.userDetails?.privilage;
    this.privilage = this.common.removeObjectsWithAllZeroActions(
      privilage
    );
  }

  getRouterLink() {

  }

  linkClicked() {
    // this.fn.setData(delete this.fn.data);
    // this.fn.data = {};
    // this.fn.setSearchData('', delete this.fn.searchData);
    // this.fn.searchData = {};
    // console.log(this.fn.searchData);
  }

  toggleMenu(clickedMenu: any): void {

    let splitUrl2 = window.location.pathname.split('/')[1];

    if (splitUrl2 == 'project-list') {
    }
    if (clickedMenu.front_router != '/' && window.innerWidth < 1200) {
      const layoutMenuExpandedDiv = document.querySelector(
        '.layout-menu-expanded'
      );
      if (layoutMenuExpandedDiv) {
        layoutMenuExpandedDiv.classList.remove('layout-menu-expanded');
      }
    }

    // Close all other menus
    this.privilage.forEach((menu: any) => {
      if (menu !== clickedMenu) {
        menu.isOpen = false;
        if (menu.submenu && menu.submenu.length !== 0) {
          menu.submenu.forEach((smenu: any) => {
            smenu.isOpen = false;
          });
        }
      }
    });

    // Toggle the clicked menu
    clickedMenu.isOpen = !clickedMenu.isOpen;
  }

  toggleSubMenu(clickedMenu: any): void {
    // this.fn.data = {};

    if (window.innerWidth < 1200) {
      const layoutMenuExpandedDiv = document.querySelector(
        '.layout-menu-expanded'
      );
      if (layoutMenuExpandedDiv) {
        layoutMenuExpandedDiv.classList.remove('layout-menu-expanded');
      }
    }
    this.privilage.forEach((menu: any) => {
      if (menu.submenu && menu.submenu.length != 0) {
        menu.submenu.forEach((smenu: any) => {
          if (smenu !== clickedMenu) {
            smenu.isOpen = false;
          }
        });
      }
    });
    clickedMenu.isOpen = !clickedMenu.isOpen;
  }

  archtoggleMenu(clickedMenu: any): void {

    if (clickedMenu.front_router != '/' && window.innerWidth < 1200) {

      const layoutMenuExpandedDiv = document.querySelector(
        '.layout-menu-expanded'
      );
      if (layoutMenuExpandedDiv) {
        layoutMenuExpandedDiv.classList.remove('layout-menu-expanded');
      }
    }
    // Close all other menus
    this.archive.forEach((menu: any) => {
      if (menu !== clickedMenu) {
        menu.isOpen = false;
        if (menu.submenu && menu.submenu.length !== 0) {
          menu.submenu.forEach((smenu: any) => {
            smenu.isOpen = false;
          });
        }
      }
    });
    // Toggle the clicked menu
    clickedMenu.isOpen = !clickedMenu.isOpen;
  }

  archtoggleSubMenu(clickedMenu: any): void {
    // this.fn.data = {};
    if (window.innerWidth < 1200) {
      const layoutMenuExpandedDiv = document.querySelector(
        '.layout-menu-expanded'
      );
      if (layoutMenuExpandedDiv) {
        layoutMenuExpandedDiv.classList.remove('layout-menu-expanded');
      }
    }
    this.archive.forEach((menu: any) => {
      if (menu.submenu && menu.submenu.length != 0) {
        menu.submenu.forEach((smenu: any) => {
          if (smenu !== clickedMenu) {
            smenu.isOpen = false;
          }
        });
      }
    });
    clickedMenu.isOpen = !clickedMenu.isOpen;
  }
}
