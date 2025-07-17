import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../../../core/services/products.service';
import { ProductCardComponent } from '../../../../shared/components/product-card/product-card.component';
@Component({
  selector: 'app-new-arrivals',
  standalone: true,
  imports: [CommonModule, ProductCardComponent],
  templateUrl: './new-arrivals.component.html',
  styleUrl: './new-arrivals.component.css'
})
export class NewArrivalsComponent implements OnInit {
  products: any[] = [];
  loading: boolean = true;

  constructor(private ProductService: ProductService) {}

  ngOnInit(): void {
    this.ProductService.getNewArrivals().subscribe(res => {
      this.products = res;
      this.loading = false;
    });
  }
}
