import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductsComponent } from './components/products/products.component';
import { ProductFiltersComponent } from './components/product-filters/product-filters.component';

const routes: Routes = [
   { path: '', component: ProductsComponent },
   { path: 'productsFilters', component: ProductFiltersComponent },
   {
        path: 'category/:category',
        component: ProductsComponent,
      },
        {
        path: 'product/:id',
        loadComponent: () =>
          import('./components/product-details/product-details.component').then(
            (m) => m.ProductDetailsComponent
          ),
      },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule { }