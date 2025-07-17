import { Component, OnInit } from '@angular/core';
import { ProductFiltersComponent } from '../product-filters/product-filters.component';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../../../core/services/products.service';

import { ActivatedRoute, Params } from '@angular/router';
import { ProductCardComponent } from '../../../../shared/components/product-card/product-card.component';
@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, ProductCardComponent, ProductFiltersComponent],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})



export class ProductsComponent implements OnInit {
  products: any[] = [];
  filteredProducts: any[] = [];
  filters: any = {};
  currentPage = 0;
  pageSize = 12;

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute
  ) {}

 ngOnInit(): void {
  this.route.queryParams.subscribe((params: Params) => {
    const search = params['search'];
    if (search && search.trim() !== '') {
      this.productService.searchProducts(search).subscribe(res => {
        this.products = res.products;
        this.loadFilteredProducts(this.filters, true);
      });
    } else {
      this.productService.getAllProducts().subscribe(products => {
        this.products = products;
        this.loadFilteredProducts(this.filters, true);
      });
    }
  });
}

  onFiltersChanged(filters: any) {
    this.loadFilteredProducts(filters, true);
  }

  loadMore() {
    this.loadFilteredProducts(this.filters, false);
  }

  loadFilteredProducts(filters: any, reset: boolean) {
    this.filters = filters;

    if (reset) {
      this.currentPage = 0;
      this.filteredProducts = [];
    }

    const filtered = this.products.filter((product) => {
      const matchCategory = !filters.category || product.category === filters.category;
      const matchBrand = !filters.brand || product.brand === filters.brand;
      const matchColor = !filters.color || product.color?.name === filters.color;
      const matchRating = !filters.rating || Math.floor(product.rating) >= filters.rating;
      const matchPrice = product.price >= filters.priceFrom && product.price <= filters.priceTo;

      return matchCategory && matchBrand && matchColor && matchRating && matchPrice;
    });

    const startIndex = this.currentPage * this.pageSize;
    const nextItems = filtered.slice(startIndex, startIndex + this.pageSize);
    this.filteredProducts = reset
      ? nextItems
      : [...this.filteredProducts, ...nextItems];

    this.currentPage++;
  }
}
