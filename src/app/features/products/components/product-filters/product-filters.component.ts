import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { ProductService } from '../../../../core/services/products.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-filters',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './product-filters.component.html',
  styleUrl: './product-filters.component.css'
})
export class ProductFiltersComponent implements OnInit {
  @Output() filtersChanged = new EventEmitter<any>();

  products: any[] = [];

  categories: { name: string, count: number }[] = [];
  brands: { name: string, count: number }[] = [];
  colors: { name: string, hex: string, count: number }[] = [];
  ratings: { stars: number, count: number }[] = [];

  selectedCategory: string = '';
  selectedBrand: string = '';
  selectedColor: string = '';
  selectedRating: number = 0;
  selectedPriceRange = { from: 0, to: 100000 };

  minPrice = 0;
  maxPrice = 100000;

  categoryOpen = true;
  brandOpen = true;
  priceOpen = true;
  colorOpen = true;
  ratingOpen = true;

  categoryShowAll = false;
  brandShowAll = false;
  colorShowAll = false;

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.productService.getAllProducts().subscribe(products => {
      this.products = products;
      this.prepareFilterOptions(products);
      this.emitFilters();
    });
  }

  prepareFilterOptions(products: any[]) {
   this.categories = [
    { name: 'الكل', count: products.length } ,
    ...this.countBy(products, 'category')
  ];
    this.brands =[{name:'الكل', count: products.length }, ...this.countBy(products, 'brand')];
    this.colors = this.countByColor(products);
    this.ratings = this.countByRating(products);

    const prices = products.map(p => p.price);
    this.minPrice = Math.min(...prices);
    this.maxPrice = Math.max(...prices);
    this.selectedPriceRange = { from: this.minPrice, to: this.maxPrice };
  }

  countBy(items: any[], key: string): { name: string, count: number }[] {
    const map = new Map<string, number>();
    for (let item of items) {
      if (!item[key]) continue;
      map.set(item[key], (map.get(item[key]) || 0) + 1);
    }
    return Array.from(map.entries()).map(([name, count]) => ({ name, count }));
  }

  countByColor(products: any[]): { name: string, hex: string, count: number }[] {
    const map = new Map<string, { hex: string, count: number }>();
    for (let product of products) {
      const color = product?.color?.name;
      const hex = product?.color?.hex;
      if (!color || !hex) continue;

      if (map.has(color)) {
        map.get(color)!.count += 1;
      } else {
        map.set(color, { hex, count: 1 });
      }
    }
    return Array.from(map.entries()).map(([name, val]) => ({ name, ...val }));
  }

  countByRating(products: any[]): { stars: number, count: number }[] {
    const map = new Map<number, number>();

    for (let product of products) {
      const rate = Math.floor(product.rating);
      map.set(rate, (map.get(rate) || 0) + 1);
    }

    const result: { stars: number, count: number }[] = [];
    for (let i = 5; i >= 1; i--) {
      result.push({ stars: i, count: map.get(i) || 0 });
    }
    result.push({ stars: 0, count: products.length });
    return result;
  }

  emitFilters() {
    this.filtersChanged.emit({
      category: this.selectedCategory,
      brand: this.selectedBrand,
      color: this.selectedColor,
      rating: this.selectedRating,
      priceFrom: this.selectedPriceRange.from,
      priceTo: this.selectedPriceRange.to,
    });
  }

  resetFilters() {
    this.selectedCategory = '';
    this.selectedBrand = '';
    this.selectedColor = '';
    this.selectedRating = 0;
    this.selectedPriceRange = { from: this.minPrice, to: this.maxPrice };
    this.emitFilters();
  }

  onMinPriceChange(event: any) {
    this.selectedPriceRange.from = +event.target.value;
    this.emitFilters();
  }

  onMaxPriceChange(event: any) {
    this.selectedPriceRange.to = +event.target.value;
    this.emitFilters();
  }

  onMinPriceInput(event: any) {
    const val = parseInt(event.target.value);
    this.selectedPriceRange.from = isNaN(val) ? this.minPrice : val;
    this.emitFilters();
  }

  onMaxPriceInput(event: any) {
    const val = parseInt(event.target.value);
    this.selectedPriceRange.to = isNaN(val) ? this.maxPrice : val;
    this.emitFilters()
  }

  toggleShowMore(section: string) {
    switch (section) {
      case 'category': this.categoryShowAll = !this.categoryShowAll; break;
      case 'brand': this.brandShowAll = !this.brandShowAll; break;
      case 'color': this.colorShowAll = !this.colorShowAll; break;
    }
  }

  getVisibleItems(items: any[], showAll: boolean) {
    return showAll ? items : items.slice(0, 6);
  }
  onBrandChange(brand: string) {
  this.selectedBrand = brand==='الكل' ? '' : brand;
  this.emitFilters();
}

onCategoryChange(category: string) {
  this.selectedCategory = category === 'الكل' ? '' : category;
  this.emitFilters();
}


get price() {
  return this.selectedPriceRange;
}
onColorChange(color: string) {
  this.selectedColor = color;
  this.emitFilters();
}
onRatingChange(rating: number) {
  this.selectedRating = rating;
  this.emitFilters();
}


}
