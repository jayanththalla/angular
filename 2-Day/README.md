# 📅 Day 2: Control Flow & Directives

**Date:** Dec 5, 2025
**Focus:** Angular 17+ Control Flow (`@for`, `@if`), Interfaces, Dynamic Styling

---

## 🚀 1. What I Learned Today

Today I moved from static HTML to fully dynamic rendering using Angular’s modern control flow.

### 🔑 Key Takeaways

- **Typed Data:**
  Created a TypeScript interface (`Task`) to strongly type the task list.

- **New Control Flow:**

  - `@for` → Replaces `*ngFor`, requires `track` for performance.
  - `@if` → Cleaner syntax for conditional checks.

- **Dynamic Styling:**
  Used `[ngClass]` to apply different styles based on the task’s state (`completed` / `pending`).

---

## 💻 2. Code Implementation Highlights

### A. 🔁 New `@for` Loop

Angular 17’s new control flow block (replaces `*ngFor`).
It **requires a `track` expression** similar to React’s `key`.

```html
@for (task of tasks; track task.id) {
<app-task-card [task]="task"></app-task-card>
} @empty {
<p>No tasks found.</p>
}
```

---

### B. ✔️ Conditional Logic with `@if`

A cleaner alternative to `*ngIf`.

```html
@if (task.isCompleted) {
<span>Done!</span>
} @else {
<span>Working on it...</span>
}
```

---

### C. 🎨 Dynamic Classes with `[ngClass]`

Used to apply styles based on task state.

```html
<div [ngClass]="{ 'done-style': task.isCompleted }">{{ task.title }}</div>
```

---

## 🧠 3. Interview Prep

### ❓ Q: Why is the `track` expression required in the new `@for` loop?

**Answer:**
Angular needs a unique identifier for each item when rendering a list.
If the array changes (sorting, deletion, update), the `track` expression lets Angular **reuse** existing DOM elements instead of destroying and recreating them.

This dramatically improves performance for large lists.

### ❓ Q: How does using interfaces improve code quality in Angular?

**Answer:**
Using interfaces enforces a contract for data structures.
This leads to:

- **Type Safety:** Catch errors at compile time.
- **Better Readability:** Clear expectations for data shapes.
- **Easier Maintenance:** Changes to data structures are centralized.

---
