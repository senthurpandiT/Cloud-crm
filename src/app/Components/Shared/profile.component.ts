import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CommonService } from '../../Services/common.service';
import { Roles, routePath } from '../../Interfaces/roles';
import { AuthService } from '../../Authentication/auth.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, RouterLink],
  providers: [],
  template: `<a class="dropdown-toggle hide-arrow" data-bs-toggle="dropdown">
  <div class="avatar avatar-sm">
    <img
      [src]="
        this.common.imageFile(
            common.userDetails.uploadto,
            common.userDetails.profile_url
          ) ? this.common.imageFile(
            common.userDetails.uploadto,
            common.userDetails.profile_url
          ) : 'assets/img/avatars/new_user.jpeg'
      "
      alt=""
      class="rounded-circle"
    />
  </div>
  </a>
  <ul class="dropdown-menu dropdown-menu-end">
  <li class="dropdown-header">
    <h6 class="mb-2">
      {{ common.userDetails?.firstname ? common.userDetails.firstname + " " : "" }}
      {{ common.userDetails?.lastname }}
    </h6>
    <div class="d-flex gap-2">
      <span class="text-primary">
        {{
          common.userDetails?.role === Roles.Admin
            ? common.LOGIN?.ROLES?.Admin
            :  common.userDetails?.role === Roles.ProjectManager
            ? common.LOGIN?.ROLES?.PROJECT_MANAGER
            :  common.userDetails?.role === Roles.Technician
            ? common.LOGIN?.ROLES?.Technician
            :  common.userDetails?.role === Roles.Installer
            ? common.LOGIN?.ROLES?.Installer
            :  common.userDetails?.role === Roles.PartnerAdmin
            ? common.LOGIN?.ROLES?.PARTNER_ADMIN
            : ""
        }}
      </span>
      <span
        [title]="
          (getTitleAttribute()?.length ?? 0) > 10
            ? getTitleAttribute()
            : ''
        "
        style="flex-shrink: 0"
      >
        <ng-container *ngIf="common.userDetails?.type == 1">
          {{
            "@" +
              (common.userDetails?.business_account?.business_name
                ? common.userDetails?.business_account?.business_name
                : "")
          }}
        </ng-container>
        <ng-container *ngIf="common.userDetails?.type == 2">
          {{
            "@" +
              (common.userDetails?.company?.companyname
                ? common.userDetails?.company?.companyname
                : "")
          }}
        </ng-container>
      </span>
    </div>
  </li>
  <li class="dropdown-divider"></li>
  <li class="dropdown-item">
    <a [routerLink]="['/profile']">
      <span class="pe-2"><i class="fa-solid fa-user"></i></span>
      {{ common.LOGIN?.EXTRA?.MYPROFILE }}
    </a>
  </li>
  <li class="dropdown-item" *ngIf="common.userDetails?.roles == Roles?.Admin">
    <a [routerLink]="[routerRedirect.Subscription]" >
      <span class="pe-2"><i class="fa fa-sack-dollar"></i></span>
      {{ common.LOGIN?.SERVICE?.My_Plan }}
    </a>
  </li>
  <li class="dropdown-divider"></li>
  <li [routerLink]="[routerRedirect.Login]" class="px-4 py-2 cursor-pointer" (click)="authService.clearData()">
    <a class="text-primary">
      <span class="pe-2"><i class="fa-solid fa-sign-out-alt"></i></span>
      {{ common.LOGIN?.EXTRA?.LOGOUT }}
    </a>
  </li>
  </ul>`,
  styles: '',
})
export class ProfileComponent {
  routerRedirect = routePath
  Roles = Roles
  constructor(public common: CommonService, public authService: AuthService) {
    this.common.userDetails = this.authService.getUsertData(this.authService.userData)
  }

  getTitleAttribute(): string | undefined {
    if (this.common.userDetails?.type == 1) {
      return this.common.userDetails?.business_account?.business_name;
    } else if (this.common.userDetails?.type == 2) {
      return this.common.userDetails?.company?.companyname;
    }
    return undefined;
  }
}




