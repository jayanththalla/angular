import { Component, Input, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api';
import { Product } from '../../models/product';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './product-details.html'
})
export class ProductDetailsComponent {
  private apiService = inject(ApiService);

  // Create a signal to hold the single product
  product = signal<Product | null>(null);

  // THE MAGIC: Angular automatically injects the route ID here!
  @Input() set id(val: string) {
    // Whenever the ID changes (or loads), fetch the data
    this.apiService.getProductById(val).subscribe((data) => {
      this.product.set(data);
    });
  }
}