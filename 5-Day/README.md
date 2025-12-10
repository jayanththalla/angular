# Day 5: Services & Dependency Injection

**Date:** 08 Dec 2025
**Focus:** Separating Business Logic from UI using Services and Dependency Injection (DI).

---

## 🚀 1. What I Learned Today
I refactored the application to follow the **Separation of Concerns** principle.
* **Services:** Created a `TaskService` to handle data manipulation (Add/Delete tasks).
* **Dependency Injection (DI):** Used Angular's DI system to provide the service to the component.
* **Encapsulation:** Used `private` signals inside the service and exposed `readonly` signals to the component to prevent accidental data corruption.

---

## 💻 2. Code Implementation Highlights

### A. The Service (`providedIn: 'root'`)
The logic lives here.

```typescript
@Injectable({ providedIn: 'root' })
export class TaskService {
  private _tasks = signal<Task[]>([]); // Private (Writable)
  
  readonly tasks = this._tasks.asReadonly(); // Public (Read-Only)

  addTask(t: Task) {
    this._tasks.update(prev => [...prev, t]);
  }
}
```

### B. The Injection (`inject()`)
The component asks for the service.

```typescript
export class AppComponent {
  // Modern Injection Syntax
  private taskService = inject(TaskService);
  
  // Accessing the read-only signal
  tasks = this.taskService.tasks;
}
```

---

## 🧠 3. Interview Prep

### Q: Why should we use Services instead of writing logic in Components?
**Answer:**
1. **Reusability:** Multiple components can use the same logic/data without rewriting it.
2. **Maintainability:** If the business logic changes (e.g., how we calculate a total), we only edit the Service, not 20 different components.
3. **Testing:** It is much easier to unit test a Service in isolation than a Component that is tied to the DOM.

### Q: What is a Singleton?
**Answer:**
A Singleton is a design pattern where a class has only one instance. In Angular, `providedIn: 'root'` ensures that the service is a Singleton, meaning all components share the same state.
