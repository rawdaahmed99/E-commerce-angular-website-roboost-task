import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { environment } from '../environments/environment';
import { Product, ApiResponse, ProductFilters } from '../models/products'; // استيراد الواجهات

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private http = inject(HttpClient);
  private baseUrl = `${environment.baseUrl}products`;

  getAllProducts(): Observable<Product[]> {
    return this.http.get<ApiResponse>(`${this.baseUrl}?limit=100`)
      .pipe(map(res => res.products));
  }

  getFeaturedProducts(): Observable<Product[]> {
    return this.getAllProducts().pipe(
      map(products =>
        products
          .filter(p => p.rating >= 4.5)
          .slice(0, 8)
      )
    );
  }

  getCategoriesWithThumbnails(): Observable<{ name: string, image: string, count: number }[]> {
    return this.getAllProducts().pipe(
      map((products: Product[]) => {
        const map = new Map<string, { image: string, count: number }>();
        for (const product of products) {
          const category = product.category;
          if (!category) continue;
          if (map.has(category)) {
            map.get(category)!.count += 1;
          } else {
            map.set(category, { image: product.thumbnail, count: 1 });
          }
        }
        return Array.from(map.entries()).slice(0, 7).map(([name, data]) => ({
          name,
          image: data.image,
          count: data.count
        }));
      })
    );
  }

  getAllCategories(): Observable<string[]> {
    return this.http.get<string[]>(`${this.baseUrl}/categories`);
  }

  getNewArrivals(): Observable<Product[]> {
    const recentDate = new Date();
    recentDate.setDate(recentDate.getDate() - 150);

    return this.getAllProducts().pipe(
      map(products =>
        products
          .filter(p => p.meta?.createdAt && new Date(p.meta.createdAt) >= recentDate)
          .slice(0, 4)
      )
    );
  }

  getProductById(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.baseUrl}/${id}`);
  }

  getFilteredProducts(filters: ProductFilters, skip: number = 0, limit: number = 10): Observable<Product[]> {
    let params = new HttpParams()
      .set('limit', limit.toString())
      .set('skip', skip.toString());

    if (filters.category && filters.category !== 'all') {
      params = params.append('category', filters.category);
    }
    return this.http.get<ApiResponse>(this.baseUrl, { params }).pipe(map(res => res.products));
  }
  
  getProductsByCategory(category: string): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(`${this.baseUrl}/category/${category}`);
  }

  searchProducts(query: string): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(`${this.baseUrl}/search`, { params: { q: query } });
  }
}
