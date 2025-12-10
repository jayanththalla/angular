# Day 6: HTTP Client & Observables

**Date:** 10 Dec 2025
**Project:** E-Commerce Dashboard (Phase 2 Start)
**Focus:** Fetching API data using `HttpClient`, `Observables`, and `AsyncPipe`.

---

## 🚀 1. What I Learned Today
Moved from local data to remote API data.
* **App Config:** Learned to use `provideHttpClient()` in `app.config.ts` (the replacement for `HttpClientModule`).
* **RxJS Observables:** Understood that `HttpClient` returns a stream (Observable), not a static value.
* **Async Pipe:** Used `products$ | async` in the HTML to handle subscriptions automatically, avoiding memory leaks.

---

## 💻 2. Code Implementation Highlights

### A. The Service (API Call)
```typescript
getProducts(): Observable<Product[]> {
  // Returns a stream, doesn't fire request yet
  return this.http.get<Product[]>('https://fakestoreapi.com/products');
}
```

### B. The Component (Streams)
We define the stream, we don't manually subscribe in the TypeScript file.

```typescript
products$ = this.apiService.getProducts();
```

### C. The View (Async Pipe)
The pipe triggers the API call.

```html
@if (products$ | async; as products) {
   <!-- Render products -->
}
```

---

## 🧠 3. Interview Prep

### Q: What is RxJS?
**Answer:**
RxJS (Reactive Extensions for JavaScript) is a library for reactive programming using Observables. Angular uses it heavily for HTTP requests, Router events, and Forms. It allows us to handle asynchronous operations (like API calls) as "streams" of data that we can modify, filter, or cancel.

### Q: How do you handle HTTP Errors?
**Answer:**
We can use the RxJS `catchError` operator inside the pipe of the Observable in the service, or handle the error callback if we manually subscribe.
