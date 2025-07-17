import { Injectable, signal, computed, effect, inject } from '@angular/core';
import { AuthService } from './auth.service';

// Define a clear interface for a cart item
export interface CartItem {
  id: number;
  title: string;
  price: number;
  quantity: number;
  thumbnail: string;
  // Add any other product properties you need
}

@Injectable({
  providedIn: 'root'
})
export class CartService {
  // Inject AuthService to know the current user
  private authService = inject(AuthService);

  // The main signal holding the current cart items in memory
  cartItems = signal<CartItem[]>([]);

  // Computed signals for count and total, derived from cartItems
  cartCount = computed(() =>
    this.cartItems().reduce((acc, item) => acc + item.quantity, 0)
  );
  cartTotal = computed(() =>
    this.cartItems().reduce((acc, item) => acc + (item.price * item.quantity), 0)
  );

  constructor() {
    // This effect runs once on service initialization and whenever the user logs in or out.
    // It's responsible for loading the correct cart from localStorage.
    effect(() => {
      const user = this.authService.currentUser();
      if (user) {
        // User is logged in
        console.log(`User ${user.username} logged in. Loading their cart.`);
        this.loadUserCart(user.id);
      } else {
        // User is a guest or logged out
        console.log('No user logged in. Loading guest cart.');
        this.loadGuestCart();
      }
    });

    // This effect runs whenever the cartItems signal changes.
    // It's responsible for saving the cart to the correct place in localStorage.
    effect(() => {
      const user = this.authService.currentUser();
      const items = this.cartItems();
      if (user) {
        // If a user is logged in, save to their specific storage
        this.saveCartToStorage(`cart_user_${user.id}`, items);
      } else {
        // Otherwise, save to the guest storage
        this.saveCartToStorage('cart_guest', items);
      }
    });
  }

  private loadUserCart(userId: number): void {
    const guestCart = this.getCartFromStorage('cart_guest');
    const userCart = this.getCartFromStorage(`cart_user_${userId}`);
    
    // Merge guest cart into user cart
    const mergedCart = this.mergeCarts(userCart, guestCart);

    this.cartItems.set(mergedCart);

    // Clear the guest cart from storage after merging
    if (guestCart.length > 0) {
      localStorage.removeItem('cart_guest');
    }
  }

  private loadGuestCart(): void {
    const guestCart = this.getCartFromStorage('cart_guest');
    this.cartItems.set(guestCart);
  }

  private mergeCarts(mainCart: CartItem[], secondaryCart: CartItem[]): CartItem[] {
    if (secondaryCart.length === 0) {
      return mainCart;
    }

    const cartMap = new Map<number, CartItem>();
    
    // Add items from the main cart first
    mainCart.forEach(item => cartMap.set(item.id, item));

    // Add or update quantities from the secondary cart
    secondaryCart.forEach(item => {
      if (cartMap.has(item.id)) {
        const existingItem = cartMap.get(item.id)!;
        existingItem.quantity += item.quantity;
      } else {
        cartMap.set(item.id, item);
      }
    });

    return Array.from(cartMap.values());
  }

  private getCartFromStorage(key: string): CartItem[] {
    if (typeof localStorage === 'undefined') return [];
    const storedCart = localStorage.getItem(key);
    return storedCart ? JSON.parse(storedCart) : [];
  }

  private saveCartToStorage(key: string, cart: CartItem[]): void {
    if (typeof localStorage === 'undefined') return;
    localStorage.setItem(key, JSON.stringify(cart));
  }

  // --- Public API for cart manipulation ---

  addToCart(product: Omit<CartItem, 'quantity'>): void {
    this.cartItems.update(items => {
      const existingItem = items.find(item => item.id === product.id);
      if (existingItem) {
        return items.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        return [...items, { ...product, quantity: 1 }];
      }
    });
  }

  updateQuantity(productId: number, newQuantity: number): void {
    this.cartItems.update(items =>
      items.map(item =>
        item.id === productId ? { ...item, quantity: newQuantity } : item
      ).filter(item => item.quantity > 0)
    );
  }

  removeItem(productId: number): void {
    this.cartItems.update(items => items.filter(item => item.id !== productId));
  }

  clearCart(): void {
    this.cartItems.set([]);
  }
}
