import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartRoutingModule } from './cart-routing.module';
import { CartComponent } from './components/cart/cart.component';

@NgModule({
  declarations: [
    
  ],
  imports: [
    CommonModule,
    CartRoutingModule,
    CartComponent
  ]
})
export class CartModule { }