import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http'; // Import HttpClient
import { Product } from '../models/product';
import { Observable } from 'rxjs'; // RxJS Library
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private http = inject(HttpClient); // Modern injection

  // We return an Observable. Think of it as a "Stream" of data.
  // It won't execute until someone "subscribes" to it.
  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>('https://fakestoreapi.com/products');
  }
  // Add this method inside your class
  getProductById(id: string): Observable<Product> {
    return this.http.get<Product>(`https://fakestoreapi.com/products/${id}`);
  }

  // Add this method inside your class
  searchProducts(query: string): Observable<Product[]> {
    // Using a different API just for search capability
    return this.http.get<any>(`https://dummyjson.com/products/search?q=${query}`).pipe(
      // The API returns an object { products: [...] }, we just want the array
      map(response => response.products)
    );
  }
}