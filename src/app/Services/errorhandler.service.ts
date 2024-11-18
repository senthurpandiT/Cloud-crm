// src/app/services/error-handler.service.ts
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class ErrorHandlerService {
  constructor(private toastr: ToastrService) {}

  handleError(err: any): string {
    const error = err?.error?.status;
    let errorMsg = 'An unknown error occurred!';

    if (error?.code === 400) {
      errorMsg = error.message || 'Bad Request';
      this.toastr.error(errorMsg);
    } else if (error?.code === 500) {
      errorMsg = 'Server unavailable!';
      this.toastr.error(errorMsg);
    }
    return errorMsg;
  }
}
