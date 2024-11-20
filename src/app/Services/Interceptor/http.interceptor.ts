import { HttpInterceptorFn } from '@angular/common/http';
import { finalize } from 'rxjs';
import { ProgressBarService } from '../progress.service';
import { inject } from '@angular/core';

export const httpInterceptor: HttpInterceptorFn = (req, next) => {
  const progressBarService = inject(ProgressBarService);
  progressBarService.show();
  return next(req).pipe(finalize(() => progressBarService.hide()));
};

