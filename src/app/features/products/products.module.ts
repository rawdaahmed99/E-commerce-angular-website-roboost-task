import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsComponent } from './components/products/products.component';
import { ProductFiltersComponent } from './components/product-filters/product-filters.component';
import { ProductsRoutingModule } from './products-routing.module';


@NgModule({
  imports: [
     CommonModule,
    ProductsRoutingModule,
     ProductsComponent,
    ProductFiltersComponent
  ]
})
export class ProductsModule { }