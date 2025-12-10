import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common'; // Needed for AsyncPipe
import { ApiService } from './services/api';
import { Observable } from 'rxjs';
import { Product } from './models/product';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule], // Add CommonModule
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class AppComponent {
  private apiService = inject(ApiService);

  // We don't store "products" array directly.
  // We store the "Stream" ($ is a naming convention for Observables)
  products$: Observable<Product[]> = this.apiService.getProducts();
}