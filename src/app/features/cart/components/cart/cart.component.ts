import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CartItem, CartService } from '../../../../core/services/cart.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {
  public cartService = inject(CartService);

  updateItemQuantity(item: CartItem, quantityChange: number): void {
    const newQuantity = item.quantity + quantityChange;
    
    if (newQuantity > 0) {
      this.cartService.updateQuantity(item.id, newQuantity);
    } else {
      this.removeItem(item.id);
    }
  }

  removeItem(itemId: number): void {
    this.cartService.removeItem(itemId);
  }

  clearCart(): void {
    this.cartService.clearCart();
  }
}
