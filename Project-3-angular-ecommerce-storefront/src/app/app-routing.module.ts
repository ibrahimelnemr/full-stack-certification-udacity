import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductItemDetailComponent } from './components/product-item-detail/product-item-detail.component';
import { CartComponent } from './components/cart/cart.component';
import { ConfirmationComponent } from './components/confirmation/confirmation.component';
import { CheckoutFormComponent } from './components/checkout-form/checkout-form.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/productlist',
    pathMatch: 'full',
  },
  {
    path: 'productlist',
    component: ProductListComponent,
  },

  {
    path: 'product/:id',
    component: ProductItemDetailComponent,
  },

  {
    path: 'cart',
    component: CartComponent,
  },

  {
    path: 'confirmation/:name',
    component: ConfirmationComponent,
  },
  {
    path: 'checkout',
    component: CheckoutFormComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
