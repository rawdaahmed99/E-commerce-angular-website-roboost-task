import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../../../core/services/products.service';
import { ProductCardComponent } from '../../../../shared/components/product-card/product-card.component';

@Component({
  selector: 'app-specialproducts',
   imports: [ CommonModule, ProductCardComponent],
  templateUrl: './specialproducts.component.html',
  styleUrl: './specialproducts.component.css'
})
export class SpecialproductsComponent {
products: any[] = [];

  constructor(private ProductService: ProductService) {}

  ngOnInit(): void {
    this.ProductService.getFeaturedProducts().subscribe(res => {
      this.products = res;

    });
  }
}
