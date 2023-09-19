import { Component, OnInit } from '@angular/core';
import { CartItem } from 'src/app/models/cart-item';
import { HttpService } from 'src/app/services/http.service';
import { CartService } from 'src/app/services/cart.service';
import { product } from 'src/app/models/product';
import { HttpClientModule } from '@angular/common/http';
import { ProductItemComponent } from '../product-item/product-item.component';
import { ProductItemDetailComponent } from '../product-item-detail/product-item-detail.component';
import { Event } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent {
  products: product[] = [];
  CartAmount: number = 0;

  ViewProductDetails($event: any) 
  {
    console.log(`Received event data: ${$event}`);

    this.router.navigate(['/product', $event]);
    
  }

  constructor(
    private http: HttpService,
    private cartservice: CartService,
    private router: Router
  ) {}

  AllCartItems = this.cartservice.GetAllItems();

  addToCart(item: product) {
    this.cartservice.AddItem(item.id, item.name, item.price);

    this.CartAmount = this.cartservice.GetAmount();

    console.log('added');
  }

  removeFromCart(item: product) {
    this.cartservice.RemoveItem(item.id, item.name);

    this.CartAmount = this.cartservice.GetAmount();
  }

  ngOnInit(): void {
    this.CartAmount = this.cartservice.GetAmount();

    this.http.GetProducts().subscribe((data) => {
      this.products = data;
    });
  }
}
