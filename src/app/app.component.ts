import { Component, OnInit } from '@angular/core';
import { ProductService } from './product.service';
import { Product } from './product';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html', // Updated template file path
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  products: Product[] = [];

  constructor(private productService: ProductService) { }

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
}
