import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';

import { ProductService } from '../../../../core/services/products.service';
import { CartService } from '../../../../core/services/cart.service';
import { AuthService } from '../../../../core/services/auth.service';
import { LoaderService } from '../../../../core/services/loader.service';


import { Product } from '../../../../core/models/products';
import { RoundPipe } from '../../../../pipes/round.pipe';
import { ProductCardComponent } from '../../../../shared/components/product-card/product-card.component';


@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CommonModule, RoundPipe, FormsModule, ProductCardComponent],
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  private route = inject(ActivatedRoute);
  private productService = inject(ProductService);
  private cartService = inject(CartService);
  private authService = inject(AuthService);
  public loaderService = inject(LoaderService);

  product: Product | null = null;
  relatedProducts: Product[] = [];
  selectedImage: string | null = null;
  quantity: number = 1;
  isLoading = true;

  reviews = [
    { user: 'أحمد', rating: 5, comment: 'منتج رائع جدًا وأنصح به' },
    { user: 'منى', rating: 4, comment: 'جيد لكن التغليف كان سيئ' }
  ];

  ngOnInit(): void {
  
    this.route.paramMap.subscribe(params => {
      const productId = params.get('id');
      if (productId) {
        this.product = null;
        this.relatedProducts = [];
        this.loadProductDetails(+productId);
      }
    });
  }

  loadProductDetails(id: number): void {
    this.isLoading = true;
    this.productService.getProductById(id).subscribe(data => {
      this.product = data;
      this.selectedImage = data.thumbnail;
      this.isLoading = false;
    
      this.loadRelatedProducts(data.category, data.id);
    });
  }

  loadRelatedProducts(category: string, currentProductId: number): void {
    this.productService.getProductsByCategory(category).subscribe(response => {

      this.relatedProducts = response.products
        .filter(p => p.id !== currentProductId)
        .slice(0, 4);
    });
  }

  addToCart(product: Product): void {
    if (!this.authService.isAuthenticated()) {

      Swal.fire('تنبيه', 'يجب تسجيل الدخول أولاً', 'info');
      return;
    }
   
    for (let i = 0; i < this.quantity; i++) {
        this.cartService.addToCart(product);
    }
    Swal.fire({
      title: 'تمت الإضافة!',
      text: `تمت إضافة ${this.quantity} من المنتج إلى السلة.`,
      icon: 'success',
      timer: 2000,
      showConfirmButton: false,
      position: 'top-end',
      toast: true
    });
  }

  getStars(rating: number): number[] {
    return Array(5).fill(0).map((_, i) => i + 1);
  }
}
