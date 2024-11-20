import {
  animate,
  keyframes,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Component } from '@angular/core';

import { Toast, ToastrService, ToastPackage } from 'ngx-toastr';

@Component({
  selector: '[custom-toast-component]',
  styles: `:host {
        position: relative;
        overflow: hidden;
        margin: 0 0 6px;
        color: #000;
        pointer-events: all;
        background-color: transparent;
        cursor: pointer;
      }
      
      ::ng-deep .toast-container {
        pointer-events: none;
        position: relative;
        z-index: 999999;
      }
      ::ng-deep .toast-top-right {
        top: 12px;
        right: 12px;
      }
      .toast-close-button {
        color: #999;
        opacity: 1;
      }
      
      .toast-close-button:hover {
        color: #02ceff;
      }
      
      ::ng-deep .toast-error,
      ::ng-deep .toast-info,
      ::ng-deep .toast-warning,
      ::ng-deep .toast-success {
        background-image: none;
      }
      
      .toaster {
        display: flex;
        color: white;
        background-color: #333333;
        width: 335px;
        min-height: 80px;
        border-radius: 4px;
        box-shadow: 0 3px 5px rgba(100, 100, 100, 0.5);
        margin: 5px 30px 5px 0;
      }
      
      .toaster .toast-icon {
        border-radius: 4px 0 0 4px;
      }
      .toaster .toast-icon.custom-toast-success {
        background-color: #67be4e;
      }
      .toaster .toast-icon.custom-toast-success #warning-icon,
      .toaster .toast-icon.custom-toast-success #info-icon,
      .toaster .toast-icon.custom-toast-success #error-icon {
        display: none;
      }
      .toaster .toast-icon.custom-toast-warning {
        background-color: #ffc825;
      }
      .toaster .toast-icon.custom-toast-warning #success-icon,
      .toaster .toast-icon.custom-toast-warning #info-icon,
      .toaster .toast-icon.custom-toast-warning #error-icon {
        display: none;
      }
      .toaster .toast-icon.custom-toast-error {
        background-color: #e9493f;
      }
      .toaster .toast-icon.custom-toast-error #success-icon,
      .toaster .toast-icon.custom-toast-error #info-icon,
      .toaster .toast-icon.custom-toast-error #warning-icon {
        display: none;
      }
      .toaster .toast-icon.custom-toast-info {
        background-color: #45a7e7;
      }
      .toaster .toast-icon.custom-toast-info #success-icon,
      .toaster .toast-icon.custom-toast-info #error-icon,
      .toaster .toast-icon.custom-toast-info #warning-icon {
        display: none;
      }
      
      .toast-icon {
        width: 50px;
        position: relative;
      }
      .toast-icon i {
        font-size: 24px;
        position: absolute;
        top: 50%;
        left: 43%;
        transform: translate(-40%, -50%);
      }
      
      .toast-title {
        font-size: 16px;
      }
      
      .toast-message {
        font-size: 12px;
        font-weight: 500;
        line-height: 15px;
      }
      
      .toast-details {
        margin: 0 10px 0 20px;
        display: flex;
        align-items: center;
        width: 235px;
      }
      
      .close-icon {
        position: relative;
      }
      .close-icon .toast-close-button {
        position: absolute;
        top: 15%;
        color: white;
        font-size: 25px;
        font-weight: 100;
      }
      `,
  template: `<div class="toaster">
      <div class="toast-icon" [class]="options.toastClass">
        <i class="fas info-icon fa-info-circle"></i>
      </div>
      <div class="toast-details">
        <div>
          <div
            *ngIf="title"
            [class]="options.titleClass"
            [attr.aria-label]="title"
            class="custom-title"
          >
            {{ title }}
          </div>
          <div
            *ngIf="message && options.enableHtml"
            role="alert"
            aria-live="polite"
            class="custom-message"
            [class]="options.messageClass"
            [innerHTML]="message"
          ></div>
          <div
            *ngIf="message && !options.enableHtml"
            role="alert"
            aria-live="polite"
            class="custom-message"
            [class]="options.messageClass"
            [attr.aria-label]="message"
          >
            {{ message }}
          </div>
        </div>
      </div>
      <div class="close-icon">
        <a
          *ngIf="options.closeButton"
          (click)="remove()"
          class="toast-close-button"
        >
          &times;
        </a>
      </div>
    </div>
    <div *ngIf="options.progressBar">
      <div class="toast-progress" [style.width]="width + '%'"></div>
    </div> `,
  animations: [
    trigger('flyInOut', [
      state(
        'inactive',
        style({
          opacity: 1,
        })
      ),
      transition(
        'inactive <=> active',
        animate(
          '500ms ease-out',
          keyframes([
            style({
              transform: 'translateX(340px)',
              offset: 0,
              opacity: 0,
            }),
            style({
              offset: 0.7,
              opacity: 1,
              transform: 'translateX(-20px)',
            }),
            style({
              offset: 1,
              transform: 'translateX(0)',
            }),
          ])
        )
      ),
      transition(
        'active => removed',
        animate(
          '500ms ease-in',
          keyframes([
            style({
              transform: 'translateX(-20px)',
              opacity: 1,
              offset: 0.2,
            }),
            style({
              opacity: 0,
              transform: 'translateX(340px)',
              offset: 1,
            }),
          ])
        )
      ),
    ]),
  ],
  preserveWhitespaces: false,
})
export class CustomToastComponent extends Toast {
  // used for demo purposes
  undoString = 'undo';

  // constructor is only necessary when not using AoT
  constructor(
    protected override toastrService: ToastrService,
    public override toastPackage: ToastPackage
  ) {
    super(toastrService, toastPackage);
  }

  action(event: Event) {
    event.stopPropagation();
    this.undoString = 'undid';
    this.toastPackage.triggerAction();
    return false;
  }
}
