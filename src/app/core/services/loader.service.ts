// src/app/core/services/loader.service.ts

import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {
  // نستخدم signal لتتبع حالة التحميل بشكل تفاعلي
  isLoading = signal<boolean>(false);

  /**
   * دالة لإظهار مؤشر التحميل.
   */
  show(): void {
    this.isLoading.set(true);
  }

  /**
   * دالة لإخفاء مؤشر التحميل.
   */
  hide(): void {
    this.isLoading.set(false);
  }
}
