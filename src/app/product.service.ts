import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Product } from './product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = 'https://fakestoreapi.com/products';
  private products: Product[] = [];
  cartItems: Product[] = [];
  constructor(private http: HttpClient) {}

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl).pipe(
      map((products: Product[]) => {
        // Remove the descriptions from the products
        return products.map(product => ({
          ...product,
          description: '' // Replace the description with an empty string
        }));
      })
    );
  }
  sortProductsByPrice(ascending: boolean): void {
    this.products.sort((a, b) => {
      if (ascending) {
        return a.price - b.price;
      } else {
        return b.price - a.price;
      }
    });
  }
}
