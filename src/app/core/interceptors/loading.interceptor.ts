import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { LoaderService } from '../services/loader.service';

export const loadingInterceptor: HttpInterceptorFn = (req, next) => {
  const loaderService = inject(LoaderService);

  // إظهار الـ Loader قبل إرسال الطلب
  loaderService.show();

  return next(req).pipe(
    // استخدام finalize لضمان إخفاء الـ Loader بعد انتهاء الطلب (سواء نجح أو فشل)
    finalize(() => {
      loaderService.hide();
    })
  );
};
