import { Component, Input, Output, EventEmitter, ɵclearResolutionOfComponentResourcesQueue } from '@angular/core';
import { product } from 'src/app/models/product';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.css'],
})
export class ProductItemComponent {
  @Input() product: product;

  @Output() viewItemDetailsEvent = new EventEmitter();

  viewItemDetails() {
    this.viewItemDetailsEvent.emit(this.product.id);

    console.log(`event emitted with id ${this.product.id}`);
  
  }

  constructor() {
    this.product = { id: 0, price: 0, name: 'N/A', url: '', description: '' };
  }
}
