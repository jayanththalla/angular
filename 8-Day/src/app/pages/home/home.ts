import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormControl, ReactiveFormsModule } from '@angular/forms'; // <--- 1. Import these
import { ApiService } from '../../services/api';
import { Product } from '../../models/product';
import { Observable, of } from 'rxjs';
import { debounceTime, switchMap, distinctUntilChanged, catchError, startWith } from 'rxjs/operators'; // <--- 2. The Power Tools

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink, ReactiveFormsModule], // <--- 3. Add Module
  templateUrl: './home.html',
  styleUrls: ['./home.scss']
})
export class HomeComponent {
  private apiService = inject(ApiService);

  // The Search Input Control
  searchControl = new FormControl('');

  // The Stream of Results
  products$: Observable<Product[]>;

  constructor() {
    // 4. Define the Pipeline
    this.products$ = this.searchControl.valueChanges.pipe(
      // A. Start with empty string to load initial data (optional)
      startWith(''),

      // B. Wait 300ms after the user STOPS typing
      debounceTime(300),

      // C. Only fire if the value is different from the last time
      distinctUntilChanged(),

      // D. The Heavy Lifter: SwitchMap
      // It cancels any previous pending API call and switches to the new one.
      switchMap((query) => {
        if (!query || query.length < 2) {
          // If empty, fetch the default list
          return this.apiService.getProducts();
        }
        // Otherwise, run the search
        return this.apiService.searchProducts(query);
      }),

      // E. Error handling (so the stream doesn't die)
      catchError(err => {
        console.error(err);
        return of([]); // Return empty array on error
      })
    );
  }
}