import { Component, inject, OnInit, Signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { RoundPipe } from '../../../pipes/round.pipe';

import { CartService } from '../../../core/services/cart.service';
import { ProductService } from '../../../core/services/products.service';
import { AuthService } from '../../../core/services/auth.service';


@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink, RoundPipe, FormsModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  private productService = inject(ProductService);
  private router = inject(Router);
  public cartService = inject(CartService);
  public authService = inject(AuthService);



  categories: string[] = [];
  searchQuery: string = '';

isDarkMode = false;
  ngOnInit(): void {
    this.loadCategories();
      this.loadTheme();
  }

  logout(): void {
    this.authService.logout();
  }

  loadCategories(): void {
    this.productService.getAllCategories().subscribe((cats) => {
      this.categories = cats.map((cat: any) => cat.name).slice(0, 8);
    });
  }


  onSearch(): void {
    if (this.searchQuery.trim()) {
      this.router.navigate(['/products'], {
        queryParams: { search: this.searchQuery.trim() }
      });
    }
  }


  translateCategory(cat: string): string {
    const map: { [key: string]: string } = {
      'smartphones': 'هواتف ذكية',
      'laptops': 'لابتوبات',
      'fragrances': 'عطور',
      'skincare': 'العناية بالبشرة',
      'groceries': 'بقالة',
      'home-decoration': 'ديكور منزلي',
      'kitchen accessories': 'اكسسوارات مطبخ',
      'mens shirts': 'قمصان رجالي',
      'mens shoes': 'أحذية رجالي',
      'mens watches': 'ساعات رجالي',
      'womens dresses': 'فساتين نسائية',
      'womens shoes': 'أحذية نسائية',
      'womens bags': 'حقائب نسائية',
      'womens watches': 'ساعات نسائية',
      'womens jewellery': 'مجوهرات نسائية',
      'sunglasses': 'نظارات شمسية',
      'automotive': 'سيارات',
      'motorcycle': 'دراجات نارية',
      'lighting': 'إضاءة',
      'tops': 'بلوزات',
      'furniture': 'أثاث',
      'beauty': 'تجميل',
      'home decoration': 'اثاث',
    };
    return map[cat.toLowerCase()] || cat;
  }


  formatCategoryLink(cat: string): string {
    return cat.toLowerCase().replace(/\s+/g, '-');
  }
  toggleTheme() {
  this.isDarkMode = !this.isDarkMode;

  if (this.isDarkMode) {
    document.body.classList.add('dark-mode');
    localStorage.setItem('theme', 'dark');
  } else {
    document.body.classList.remove('dark-mode');
    localStorage.setItem('theme', 'light');
  }
}
loadTheme() {
  const savedTheme = localStorage.getItem('theme');
  this.isDarkMode = savedTheme === 'dark';
  if (this.isDarkMode) {
    document.body.classList.add('dark-mode');
  }
}

}
