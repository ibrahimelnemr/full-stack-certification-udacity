export class CartItem {
  productid: number;
  name: string;
  price: number;
  quantity: number;

  constructor(
    ProductId: number,
    ProductName: string,
    ProductPrice: number,
    ProductQuantity: number,
  ) {
    this.productid = ProductId;
    this.name = ProductName;
    this.price = ProductPrice;
    this.quantity = ProductQuantity;
  }
}
