import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http'; // Import HttpClient
import { Product } from '../models/product';
import { Observable } from 'rxjs'; // RxJS Library

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
}