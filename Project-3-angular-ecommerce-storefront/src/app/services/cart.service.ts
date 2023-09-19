import { Injectable } from '@angular/core';
import { CartItem } from '../models/cart-item';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  cart: CartItem[] = [];
  amount: number = 0;

  constructor() {}

  AddItem(ProductId: number, ProductName: string, ProductPrice: number) {
    const itemFound = this.cart.find(
      (searchItem) => ProductId === searchItem.productid,
    );

    if (itemFound) {
      itemFound.quantity += 1;
    } else {
      this.cart.push(new CartItem(ProductId, ProductName, ProductPrice, 1));
    }
    alert(`${ProductName} added to cart!`);
    this.amount += 1;
  }

  RemoveItem(ProductId: number, ProductName: string) {
    const itemIndex = this.cart.findIndex(
      (searchItem) => ProductId === searchItem.productid,
    );

    if (itemIndex !== -1) {
      if (this.cart[itemIndex].quantity > 1) {
        this.cart[itemIndex].quantity -= 1;
      } else {
        this.cart.splice(itemIndex, 1);
      }
      this.amount -= 1;

      alert(`${ProductName} removed from cart!`);

    } else {
      alert(`Cart is empty!`);
    }
  }

  GetAllItems() {
    return this.cart;
  }

  GetTotalCost(): number {
    let total: number = 0;
    this.cart.forEach((item) => {
      total += item.price * item.quantity;
      total = Number(total.toFixed(2));
    });

    return total;
  }

  GetAmount() {
    return this.amount;
  }

  onSubmit(): void {}
}
