# 📅 Day 3: Angular Signals & Event Handling

**Date:** 06 Dec 2025
**Focus:** Reactive State Management with Signals (`signal`, `computed`) & Child-to-Parent Communication (`@Output`)

---

## 🚀 1. What I Learned Today

Today I refactored the app to use **Angular Signals**, the modern reactive state system in Angular 17+.

### 🔑 Key Takeaways

- **Writable Signals (`signal`)**
  Replaced the regular array with a reactive signal:
  `signal<Task[]>([])`.

- **Computed Signals (`computed`)**
  Used to automatically derive values like total task count.

- **Event Emitters (`@Output`)**
  Implemented child-to-parent communication to delete tasks from the parent component.

---

## 💻 2. Code Implementation Highlights

---

### A. ✨ Defining & Updating Signals

**app.component.ts**

```ts
// 1. Initialize
tasks = signal<Task[]>([]);

// 2. Read (in TypeScript)
console.log(this.tasks());

// 3. Update (Immutable style)
this.tasks.update((oldTasks) => [...oldTasks, newTask]);
```

---

### B. 🧮 Computed Signals

Computed signals are **cached** and automatically recompute only when their dependencies change.

```ts
// Recalculates whenever `tasks` updates
totalTasks = computed(() => this.tasks().length);
```

---

### C. 🔄 Child → Parent Communication (`@Output`)

Used for sending delete action from the task card to the parent.

#### **Child Component (task-card.component.ts)**

```ts
@Output() deleteEvent = new EventEmitter<number>();

onDelete() {
  this.deleteEvent.emit(this.task.id);
}
```

#### **Parent Component (app.component.html)**

```html
<app-task-card (deleteEvent)="deleteTask($event)"></app-task-card>
```

---

## 🧠 3. Interview Prep

### ❓ Q: Why use **Signals** instead of normal variables?

**Answer:**
Traditional Angular relies on **Zone.js**, which triggers change detection across the entire component tree for every event (click, timer, API call).

**Signals enable Fine-Grained Reactivity:**

- Only the specific UI parts depending on a changed signal are updated.
- No need to re-check the whole app.
- Much better performance for large-scale applications.
- Enables a future Angular without Zone.js.

### ❓ Q: How do `computed` signals improve performance?

**Answer:**
`computed` signals cache their values and only recompute when their dependencies change.
This avoids unnecessary calculations and DOM updates, leading to more efficient rendering and better app performance.
Using interfaces provides a clear contract for data structures, ensuring type safety and consistency across the application.
This leads to:

- Early detection of errors during development.
- Improved code readability and maintainability.

### ❓ Q: How does child-to-parent communication work in Angular?

**Answer:**
Child components can communicate with parent components using `@Output` decorators combined with `EventEmitter`.
When an event occurs in the child (like a button click), it emits an event that the parent listens for, allowing the parent to respond accordingly (e.g., deleting an item).
Using interfaces provides a clear contract for data structures, ensuring type safety and consistency across the application. This leads to:

- Early detection of errors during development.
- Improved code readability and maintainability.
