# Day 7: Angular Routing & Component Input Binding

**Date:** December 11, 2025  
**Focus:** Single Page Application (SPA) Routing, Dynamic Parameters, and Navigation with Modern Input Binding Pattern.

---

## 📚 Table of Contents

1. [What I Learned Today](#-1-what-i-learned-today)
2. [Core Concepts Explained](#-2-core-concepts-explained)
3. [Code Implementation](#-3-code-implementation)
4. [Interview Preparation](#-4-interview-preparation)
5. [Best Practices & Common Mistakes](#-5-best-practices--common-mistakes)
6. [Comparison: Old vs New Approach](#-6-comparison-old-vs-new-approach)

---

## 🚀 1. What I Learned Today

Today, I transformed a basic component-based dashboard into a **Single Page Application (SPA)** with multiple routes and dynamic navigation. The key learnings include:

### Key Achievements:

- ✅ **Route Configuration:** Defined multiple paths in `app.routes.ts` for navigation
- ✅ **RouterOutlet Directive:** Implemented dynamic component rendering based on URL
- ✅ **RouterLink Directive:** Created client-side navigation without page reloads
- ✅ **Component Input Binding:** Used Angular's modern `@Input` setter pattern with `withComponentInputBinding()` to read URL parameters directly into component properties
- ✅ **Dynamic Data Fetching:** Triggered API calls based on URL parameter changes

### Why This Matters:

Modern web applications require seamless navigation between different views without losing state or reloading the entire page. Angular's routing system handles this efficiently while maintaining a clean separation of concerns.

---

## 🧠 2. Core Concepts Explained

### A. What is SPA (Single Page Application)?

**Definition:**
A Single Page Application is a web application that dynamically rewrites the current page rather than loading entire new pages from the server. The routing happens on the client-side.

**How it works:**

```
Traditional Web App:
User clicks link → Request sent to server → Server returns new HTML → Full page reload

SPA (Angular):
User clicks link → Router intercepts → Component swaps in DOM → No server request → No reload
```

**Benefits of SPA:**

- ⚡ **Faster Navigation:** No full page reload needed
- 💾 **Better UX:** State can be preserved across navigation
- 📱 **Offline Capability:** Can work partially offline with service workers
- 🎯 **Responsive Feel:** Instant visual feedback

### B. What is RouterOutlet?

**Definition:**
`<router-outlet>` is an Angular directive that acts as a **placeholder in the DOM**. The router dynamically replaces this placeholder with the component that matches the current route.

**How it works:**

```typescript
// When URL is: /product/5
// Angular Router finds matching route and injects ProductDetailsComponent here

<div class="app">
  <header><!-- Header stays here --></header>
  <router-outlet></router-outlet>  <!-- ProductDetailsComponent renders here -->
  <footer><!-- Footer stays here --></footer>
</div>
```

**Key Points:**

- Only ONE `<router-outlet>` typically in the main app component
- Multiple outlets can exist (named outlets) for advanced layouts
- Everything outside `<router-outlet>` remains unchanged during navigation

### C. What is RouterLink?

**Definition:**
`routerLink` is an Angular directive that binds to HTML elements to enable client-side navigation without causing a full page reload.

**Syntax:**

```html
<!-- Simple route -->
<a routerLink="/home">Home</a>

<!-- Route with parameters -->
<a [routerLink]="['/product', productId]">View Product</a>

<!-- Route with query parameters -->
<a [routerLink]="['/search']" [queryParams]="{ keyword: 'shoes' }">Search Shoes</a>

<!-- Relative routing -->
<a routerLink="details">View Details</a>
```

**Why use RouterLink instead of `href`?**

```typescript
// ❌ Bad - Causes full page reload
<a href="/product/5">Product</a>

// ✅ Good - Client-side navigation, preserves state
<a routerLink="/product/5">Product</a>
```

### D. Component Input Binding (Modern Pattern)

**Definition:**
Modern Angular allows components to receive route parameters directly through `@Input` properties, eliminating the need to manually subscribe to route observables.

**The Magic Behind the Scenes:**

```typescript
// This works because of: provideRouter(routes, withComponentInputBinding())
// It automatically maps route parameters to @Input properties

@Input() set id(productId: string) {
  console.log('Product ID changed to:', productId);
  // React to the change
}
```

**How Angular Maps Parameters:**

```typescript
// Route definition
{ path: 'product/:id', component: ProductDetailsComponent }

// URL: /product/123
// Angular automatically extracts 'id' from the URL segment
// It then passes '123' to the @Input() id property

// Query Parameters: /search?keyword=shoes&sort=price
// Gets mapped to @Input() keyword and @Input() sort

// Fragment: /page#section-5
// Gets mapped to @Input() section
```

---

## 💻 3. Code Implementation

### Step 1: Define Routes in `app.routes.ts`

```typescript
import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ProductDetailsComponent } from './pages/product-details/product-details.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    component: HomeComponent,
    data: { title: 'Shop Items' },
  },
  {
    path: 'product/:id',
    component: ProductDetailsComponent,
    data: { title: 'Product Details' },
  },
  {
    path: '**', // Wildcard route - catches all unmatched routes
    redirectTo: 'home',
  },
];
```

**Route Structure Explained:**

- `path`: The URL segment that triggers this route
- `component`: The component to render
- `data`: Optional metadata about the route
- `pathMatch: 'full'`: Ensures exact match (only for redirects)
- `:id`: Route parameter (dynamic segment)
- `**`: Wildcard route (must be last)

### Step 2: Enable Component Input Binding in `main.ts`

```typescript
import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { AppComponent } from './app/app.component';
import { routes } from './app/app.routes';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(
      routes,
      withComponentInputBinding() // Enable automatic parameter mapping
    ),
  ],
}).catch((err) => console.error(err));
```

**Why `withComponentInputBinding()`?**
Without it, you'd need to manually inject `ActivatedRoute` and subscribe to observables in every component.

### Step 3: Update Root Component (`app.ts`)

```typescript
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class AppComponent {
  // No additional logic needed here
  // RouterOutlet handles all navigation
}
```

**Template (`app.html`):**

```html
<div class="app-container">
  <header>
    <!-- Header content stays visible during navigation -->
  </header>

  <main>
    <router-outlet></router-outlet>
    <!-- Dynamic component renders here -->
  </main>

  <footer>
    <!-- Footer content stays visible during navigation -->
  </footer>
</div>
```

### Step 4: Home Component with Navigation (`home.ts`)

```typescript
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ProductService } from '../../services/product.service';

interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class HomeComponent implements OnInit {
  products$ = this.productService.getProducts();

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    console.log('Home component loaded');
  }
}
```

**Template (`home.html`):**

```html
<div class="container">
  <h1>Shop Items</h1>

  @if (products$ | async; as products) {
  <div class="grid">
    @for (item of products; track item.id) {
    <div class="card" [routerLink]="['/product', item.id]" role="button" tabindex="0">
      <img [src]="item.image" [alt]="item.title" loading="lazy" />
      <h3>{{ item.title }}</h3>
      <p class="price">${{ item.price }}</p>
      <button (click)="$event.stopPropagation()">Add to Cart</button>
    </div>
    }
  </div>
  } @else {
  <p>Loading products...</p>
  }
</div>
```

### Step 5: Product Details Component with Input Binding (`product-details.ts`)

```typescript
import { Component, Input, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ProductService } from '../../services/product.service';

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  image: string;
}

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './product-details.html',
  styleUrl: './product-details.scss',
})
export class ProductDetailsComponent {
  product = signal<Product | null>(null);
  isLoading = signal(false);
  error = signal<string | null>(null);

  constructor(private productService: ProductService) {}

  /**
   * Automatic Input Binding:
   * This setter is triggered automatically by Angular Router when:
   * 1. Component is initialized with a route parameter
   * 2. Route parameter changes (e.g., from /product/1 to /product/2)
   *
   * No manual subscription needed!
   */
  @Input() set id(productId: string) {
    if (!productId) return;

    this.fetchProduct(productId);
  }

  private fetchProduct(productId: string): void {
    this.isLoading.set(true);
    this.error.set(null);

    this.productService.getProductById(productId).subscribe({
      next: (product) => {
        this.product.set(product);
        this.isLoading.set(false);
      },
      error: (err) => {
        this.error.set('Failed to load product details');
        this.isLoading.set(false);
        console.error('Product loading error:', err);
      },
    });
  }

  addToCart(): void {
    if (this.product()) {
      console.log('Added to cart:', this.product()?.title);
      // TODO: Implement cart logic
    }
  }
}
```

**Template (`product-details.html`):**

```html
<div class="container">
  <a routerLink="/" class="back-link">← Back to Shop</a>

  @if (isLoading()) {
  <div class="loading">Loading product details...</div>
  } @else if (error()) {
  <div class="error">{{ error() }}</div>
  } @else if (product(); as p) {
  <div class="product-detail">
    <div class="image-section">
      <img [src]="p.image" [alt]="p.title" class="product-image" />
    </div>

    <div class="info-section">
      <h1>{{ p.title }}</h1>
      <p class="price">${{ p.price }}</p>
      <p class="description">{{ p.description }}</p>

      <div class="actions">
        <button (click)="addToCart()" class="btn-primary">Add to Cart</button>
        <button routerLink="/" class="btn-secondary">Continue Shopping</button>
      </div>
    </div>
  </div>
  }
</div>
```

---

## 🎯 4. Interview Preparation

### Q1: What is the difference between `<router-outlet>` and component rendering?

**Answer:**
`<router-outlet>` is a special directive that doesn't render anything by itself. Instead, it marks a location where Angular's Router will **dynamically insert and remove components based on the current route**.

**Example:**

```typescript
// Without router-outlet (Static)
<app-product-details></app-product-details>  // Always renders

// With router-outlet (Dynamic)
<router-outlet></router-outlet>  // Renders different components based on URL
// If URL is /product/1 → ProductDetailsComponent renders
// If URL is /home → HomeComponent renders
// If URL is /about → AboutComponent renders
```

### Q2: What is the purpose of `withComponentInputBinding()` and why is it important?

**Answer:**
`withComponentInputBinding()` enables automatic mapping of route parameters to component `@Input` properties. This is the **modern Angular pattern** that reduces boilerplate code.

**Example Comparison:**

```typescript
// ❌ Old way (without withComponentInputBinding)
export class ProductDetailsComponent {
  product: Product | null = null;

  constructor(private route: ActivatedRoute, private productService: ProductService) {
    // Manual subscription - lots of boilerplate!
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      this.productService.getProductById(id).subscribe((product) => {
        this.product = product;
      });
    });
  }
}

// ✅ New way (with withComponentInputBinding)
export class ProductDetailsComponent {
  product: Product | null = null;

  constructor(private productService: ProductService) {}

  @Input() set id(productId: string) {
    // Automatic! Angular Router passes the parameter here
    this.productService.getProductById(productId).subscribe((product) => {
      this.product = product;
    });
  }
}
```

### Q3: How does Angular know to pass the `:id` parameter to the `@Input() id` property?

**Answer:**
When you enable `withComponentInputBinding()`, Angular Router automatically matches:

- **Route parameters** (`:id` from `path: 'product/:id'`)
- **Query parameters** (from URL like `?keyword=shoes`)
- **Fragment** (from URL like `#section-5`)

To the component's `@Input` properties with the **same names**.

**Example:**

```typescript
// Route definition
{ path: 'product/:id/review/:reviewId', component: ReviewComponent }

// Component
export class ReviewComponent {
  @Input() id!: string;           // Maps to :id
  @Input() reviewId!: string;     // Maps to :reviewId
  @Input() highlight?: string;    // Maps to ?highlight=true
  @Input() section?: string;      // Maps to #section (fragment)
}

// URL: /product/123/review/456?highlight=true#section-5
// Automatically:
// id = '123'
// reviewId = '456'
// highlight = 'true'
// section = '5'
```

### Q4: What is the `**` wildcard route and why do we need it?

**Answer:**
The `**` wildcard route is a **catch-all route** that matches ANY path that doesn't match previous routes. It must be the **last route** because the router matches routes in order (first match wins).

**Common Uses:**

```typescript
const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: '404', component: NotFoundComponent },

  // If user enters /invalid-url, redirect to 404
  { path: '**', redirectTo: '404' },
];
```

**Why Last?** If `**` were first, it would match every route before checking specific ones:

```typescript
// ❌ Wrong order
{ path: '**', redirectTo: '404' },
{ path: 'home', component: HomeComponent },  // Never reached!

// ✅ Correct order
{ path: 'home', component: HomeComponent },
{ path: '**', redirectTo: '404' }
```

### Q5: Explain the `pathMatch` property in routes.

**Answer:**
`pathMatch` determines how Angular matches the path in the URL with the route path. Two values exist:

```typescript
// 'prefix' - Default
// Matches if URL starts with the path
{ path: '', component: HomeComponent, pathMatch: 'prefix' }
// Matches: /, /home, /about, etc. (everything starts with '')

// 'full' - Exact match
// Matches only if the entire remaining URL matches
{ path: '', redirectTo: 'home', pathMatch: 'full' }
// Only matches: / (empty path exactly)
// Does NOT match: /home, /about
```

**When to use each:**

```typescript
// Use 'full' with empty path and redirects
{ path: '', redirectTo: 'home', pathMatch: 'full' }

// Use 'prefix' (default) for component routes
{ path: 'products', component: ProductsComponent }

// Don't use 'full' with named paths
{ path: 'products', component: ProductsComponent, pathMatch: 'full' }
// This would NOT match /products/123
```

### Q6: How do you pass data between routed components?

**Answer:**
There are several methods:

```typescript
// Method 1: Route Parameters (visible in URL)
[routerLink]="['/product', productId]"
// URL: /product/123

// Method 2: Query Parameters (visible in URL)
[routerLink]="['/search']" [queryParams]="{ keyword: 'shoes' }"
// URL: /search?keyword=shoes

// Method 3: Route Data (not visible, defined in route config)
{ path: 'product', component: ProductComponent, data: { title: 'Products' } }

// Method 4: Component State Service (not in URL)
this.dataService.setProduct(product);
// Access in another component: this.dataService.getProduct()
```

### Q7: What happens if you navigate to a component with `@Input` parameters but the route changes before the data loads?

**Answer:**
The setter is called again with the new parameter value. This is perfect for scenarios where users quickly navigate between products:

```typescript
@Input() set id(productId: string) {
  this.fetchProduct(productId);  // Called again with new ID
}

// User navigates: /product/1 → /product/2 → /product/3
// Setter is called 3 times with: '1', '2', '3'
// Previous requests might still be pending, causing race conditions!
```

**Solution: Unsubscribe or use RxJS operators:**

```typescript
private subscription?: Subscription;

@Input() set id(productId: string) {
  // Unsubscribe from previous request
  this.subscription?.unsubscribe();

  // Subscribe to new request
  this.subscription = this.productService.getProductById(productId)
    .subscribe(product => this.product.set(product));
}
```

---

## 🛡️ 5. Best Practices & Common Mistakes

### Best Practices

#### ✅ 1. Always import `RouterOutlet` in the root component

```typescript
import { RouterOutlet } from '@angular/router';

@Component({
  imports: [RouterOutlet]  // Don't forget!
})
```

#### ✅ 2. Use typed route parameters

```typescript
// Instead of:
this.id = params.get('id');  // Type is any

// Use:
@Input() id!: string;  // Explicitly typed
```

#### ✅ 3. Handle loading and error states

```typescript
@Input() set id(productId: string) {
  this.isLoading.set(true);
  this.productService.getProductById(productId).subscribe({
    next: (product) => this.product.set(product),
    error: (err) => {
      this.error.set('Failed to load');
      console.error(err);
    },
    complete: () => this.isLoading.set(false)
  });
}
```

#### ✅ 4. Use `[routerLink]` instead of navigation.navigate() for simple cases

```typescript
// Simple cases: Use [routerLink]
<a [routerLink]="['/product', id]">View Product</a>

// Complex navigation logic: Use Router service
constructor(private router: Router) {}

navigateWithLogic(): void {
  if (this.validateInput()) {
    this.router.navigate(['/checkout'], {
      queryParams: { total: this.calculateTotal() }
    });
  }
}
```

#### ✅ 5. Lazy load routes for better performance

```typescript
const routes: Routes = [
  { path: 'home', component: HomeComponent },

  // Lazy load admin section
  {
    path: 'admin',
    loadComponent: () => import('./pages/admin/admin.component').then((m) => m.AdminComponent),
  },
];
```

### Common Mistakes

#### ❌ 1. Forgetting to import `RouterOutlet`

```typescript
// Error: router-outlet is not a known element
@Component({
  imports: [CommonModule]  // RouterOutlet missing!
})
```

#### ❌ 2. Using `href` instead of `routerLink`

```typescript
// ❌ Causes full page reload
<a href="/product/123">Product</a>

// ✅ Client-side navigation
<a routerLink="/product/123">Product</a>
```

#### ❌ 3. Putting `**` route before specific routes

```typescript
// ❌ Wrong - ** matches first, prevents other routes
const routes: Routes = [
  { path: '**', redirectTo: '404' },
  { path: 'home', component: HomeComponent }, // Never reached!
];

// ✅ Correct - specific routes first
const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: '**', redirectTo: '404' },
];
```

#### ❌ 4. Not handling the async `@Input` setter

```typescript
// ❌ Problem: Multiple requests can race
@Input() set id(productId: string) {
  this.productService.getProductById(productId).subscribe(...);
}

// ✅ Solution: Cancel previous request
private subscription?: Subscription;

@Input() set id(productId: string) {
  this.subscription?.unsubscribe();  // Cancel previous
  this.subscription = this.productService.getProductById(productId)
    .subscribe(...);
}
```

#### ❌ 5. Not using `pathMatch: 'full'` with empty paths

```typescript
// ❌ This will match all routes!
{ path: '', redirectTo: 'home' }

// ✅ Correct
{ path: '', redirectTo: 'home', pathMatch: 'full' }
```

---

## 📊 6. Comparison: Old vs New Approach

### Old Approach (Pre Angular 16)

```typescript
// app.config.ts
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes)  // No withComponentInputBinding()
  ]
};

// product-details.component.ts
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({...})
export class ProductDetailsComponent implements OnInit, OnDestroy {
  product: Product | null = null;
  private subscription?: Subscription;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    // Manual subscription to paramMap
    this.subscription = this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.productService.getProductById(id)
          .subscribe(product => this.product = product);
      }
    });
  }

  ngOnDestroy(): void {
    // Manual cleanup
    this.subscription?.unsubscribe();
  }
}
```

### New Approach (Angular 16+)

```typescript
// main.ts
import { provideRouter, withComponentInputBinding } from '@angular/router';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes, withComponentInputBinding())  // Automatic mapping!
  ]
});

// product-details.component.ts
import { Component, Input } from '@angular/core';

@Component({...})
export class ProductDetailsComponent {
  product = signal<Product | null>(null);

  constructor(private productService: ProductService) {}

  // Automatic! Angular Router passes the :id parameter here
  @Input() set id(productId: string) {
    this.productService.getProductById(productId)
      .subscribe(product => this.product.set(product));
  }
}
```

### Advantages of New Approach

| Aspect             | Old                                      | New                       |
| ------------------ | ---------------------------------------- | ------------------------- |
| **Code Lines**     | 25+                                      | 10+                       |
| **Boilerplate**    | High (ActivatedRoute, OnInit, OnDestroy) | Low (Just @Input setter)  |
| **Memory Leaks**   | Risk (manual unsubscribe)                | Safer (automatic cleanup) |
| **Readability**    | Complex subscription logic               | Clear and direct          |
| **Type Safety**    | Weak (string-based params)               | Strong (@Input types)     |
| **Learning Curve** | Steep                                    | Gentle                    |

---

## 🎓 Summary

**What I accomplished:**

- Built a multi-page Angular application using routing
- Implemented dynamic component rendering with `<router-outlet>`
- Created client-side navigation with `routerLink`
- Used modern input binding to receive URL parameters directly in components
- Added proper error handling and loading states
- Styled all components with professional CSS

**Key Takeaways:**

1. **SPA routing** is fundamental to modern web applications
2. **`withComponentInputBinding()`** is the modern Angular pattern (simpler than ActivatedRoute)
3. **Router parameter mapping** is automatic and reduces boilerplate
4. **`pathMatch: 'full'`** is required with empty path redirects
5. **`**` wildcard route\*\* must be last and is used for 404 handling

**Next Steps:**

- Implement route guards (CanActivate, CanDeactivate)
- Add nested routes for complex layouts
- Optimize with lazy loading for better performance
- Implement data caching strategies

---

## 📖 Additional Resources

- [Angular Router Documentation](https://angular.io/guide/router)
- [Component Input Binding](https://angular.io/api/router/withComponentInputBinding)
- [Route Parameters](https://angular.io/guide/router#getting-route-information)
- [RouterLink vs href](https://angular.io/guide/router#router-directives)

---

**Last Updated:** December 11, 2025  
**Status:** ✅ Complete - Ready for Interview Preparation
