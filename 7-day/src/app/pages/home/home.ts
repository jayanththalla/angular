import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common'; // Needed for AsyncPipe
import { ApiService } from '../../services/api';
import { Observable } from 'rxjs';
import { Product } from '../../models/product';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'home-root',
  standalone: true,
  imports: [CommonModule, RouterLink], // Add CommonModule
  templateUrl: './home.html',
  styleUrls: ['./home.scss']
})
export class HomeComponent {
  private apiService = inject(ApiService);

  // We don't store "products" array directly.
  // We store the "Stream" ($ is a naming convention for Observables)
  products$: Observable<Product[]> = this.apiService.getProducts();
}