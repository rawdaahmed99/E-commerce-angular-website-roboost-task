import { Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { RoundPipe } from '../../../pipes/round.pipe';
import { CartService } from '../../../core/services/cart.service';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-product-card',
  standalone: true, 
  imports: [CommonModule, RoundPipe],
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent {

  private router = inject(Router);
  private cartService = inject(CartService);
  public authService = inject(AuthService); 

  @Input() product: any;

  
  goToDetails(id: number): void {
    this.router.navigate(['/products/product', id]);
  }

  
  addToCart(product: any): void {

    if (!this.authService.isAuthenticated()) {
     
      Swal.fire({
        title: 'تنبيه',
        text: 'يجب عليك تسجيل الدخول أولاً لإضافة منتجات إلى السلة.',
        icon: 'info',
        confirmButtonText: 'تسجيل الدخول',
        showCancelButton: true,
        cancelButtonText: 'إلغاء',
        confirmButtonColor: '#62D0B6',
      }).then((result) => {
    
        if (result.isConfirmed) {
          this.router.navigate(['/auth/login']);
        }
      });
      return; 
    }

    this.cartService.addToCart(product);

    Swal.fire({
      title: 'تمت الإضافة!',
      text: 'تمت إضافة المنتج إلى السلة بنجاح.',
      icon: 'success',
      timer: 2000, 
      showConfirmButton: false,
      position: 'top-end',
      toast: true
    });
  }
}
