import { Component } from '@angular/core';
import {Product} from "../product";
import {ProductService} from "../product.service";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent {
  products: Product[] = [];

  constructor(private productService: ProductService) {
    this.cartItems = productService.cartItems;
  }
  ngOnInit() {
    this.productService.getProducts().subscribe((products) => {
      this.products = products;
    });
  }

  addToCart(product: Product): void {
    if (!this.productService.cartItems.includes(product)) {
      this.productService.cartItems.push(product);
    }
  }

  removeFromCart(product: Product): void {
    const index = this.productService.cartItems.indexOf(product);
    if (index !== -1) {
      this.productService.cartItems.splice(index, 1);
    }
  }

  updateQuantity(product: Product): void {
    if (product.quantity < 1) {
      product.quantity = 1;
    }
  }
  cartItems: Product[];

  getTotalPrice(): number {
    let totalPrice = 0;
    for (const item of this.cartItems) {
      totalPrice += item.price * item.quantity;
    }
    return totalPrice;
  }
}
