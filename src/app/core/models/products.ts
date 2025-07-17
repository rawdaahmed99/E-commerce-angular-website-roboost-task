// src/app/core/models/product.model.ts

export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
  meta?: { // The API sometimes includes a meta object
    createdAt: string;
    updatedAt: string;
    barcode: string;
    qrCode: string;
  };
}

export interface ApiResponse {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}

export interface ProductFilters {
  q?: string;
  category?: string;
  brand?: string;
  rating?: number;
  priceFrom?: number;
  priceTo?: number;
}
