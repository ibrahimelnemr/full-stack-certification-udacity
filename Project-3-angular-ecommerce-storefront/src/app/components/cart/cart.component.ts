import { Component } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { CartItem } from 'src/app/models/cart-item';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent {
  cart: CartItem[] = [];
  totalCost: number = 0;
  CartAmount = 0;

  removeFromCart(item: CartItem) {
    this.cartService.RemoveItem(item.productid, item.name);

    this.CartAmount = this.cartService.GetAmount();

    this.totalCost = this.cartService.GetTotalCost();
  }

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.cart = this.cartService.GetAllItems();

    this.CartAmount = this.cartService.GetAmount();

    this.totalCost = this.cartService.GetTotalCost();
  }
}
