import { Component } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { ProductItemComponent } from '../product-item/product-item.component';
import { HttpService } from 'src/app/services/http.service';
import { product } from 'src/app/models/product';

@Component({
  selector: 'app-product-item-detail',
  templateUrl: './product-item-detail.component.html',
  styleUrls: ['./product-item-detail.component.css'],
})
export class ProductItemDetailComponent {
  product: product = {
    id: 0,
    name: '',
    price: 0.0,
    url: '',
    description: '',
  };

  AllProducts: product[] = [];

  constructor(
    private route: ActivatedRoute,
    private http: HttpService,
  ) {}

  GetProductByID(id: number) {
    this.AllProducts.forEach((item) => {
      if (String(item.id) === String(this.product.id)) {
        console.log('match');
        this.product.name = item.name;
        this.product.description = item.description;
        this.product.price = item.price;
        this.product.url = item.url;
      }
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.product.id = params['id'] as number;
    });

    this.http.GetProducts().subscribe((data) => {
      this.AllProducts = data;

      this.GetProductByID(this.product.id);
    });
  }
}
