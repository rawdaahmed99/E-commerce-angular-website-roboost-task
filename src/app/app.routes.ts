import { Routes } from '@angular/router';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { BlanckLayoutComponent } from './layouts/blanck-layout/blanck-layout.component';
import { NotFoundComponent } from './shared/components/not-found/not-found.component';

export const routes: Routes = [
  {
    path: '',
    component: BlanckLayoutComponent,
    children: [
      {
        path: 'home',
        loadChildren: () =>
          import('./Features/home/home.module').then(m => m.HomeModule)
      },
      {
        path: 'products',
        loadChildren: () =>
          import('./Features/products/products.module').then(m => m.ProductsModule)
      },
      {
        path: 'cart',
        loadChildren: () =>
          import('./Features/cart/cart.module').then(m => m.CartModule)
      },
      { path: '', redirectTo: 'home', pathMatch: 'full' }
    ],
  },
  {
    path: '',
    component: AuthLayoutComponent,
    children: [
      {
        path: 'auth',
        loadChildren: () =>
          import('./Features/auth/auth.module').then(m => m.AuthModule)
      }
    ],
  },
  { path: '**', component: NotFoundComponent },
];