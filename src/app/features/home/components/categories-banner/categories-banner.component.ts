import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { forkJoin, map } from 'rxjs';
import { ProductService } from '../../../../core/services/products.service';

@Component({
  selector: 'app-categories-banner',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './categories-banner.component.html',
  styleUrl: './categories-banner.component.css'
})
export class CategoriesBannerComponent implements OnInit {
  categoriesWithImages: { name: string, image: string , count: number}[] = [];
  loading = true;

  constructor(private productService: ProductService) {}

ngOnInit(): void {
  this.productService.getCategoriesWithThumbnails().subscribe(data => {
    this.categoriesWithImages = data;
    this.loading = false;
  });
}

}
