# 📅 Day 1: Angular Architecture, Setup & Standalone Components

**Date:** Dec 4 , 2025
**Focus:** Angular 17+ Modern Architecture, CLI, Component Communication
**Project:** **Smart Task Manager** (Setup & Basic Layout)

---

## 🚀 1. What I Learned Today

Today’s session was about transitioning from **old Angular (Modules)** to **modern Angular (Standalone Components)**.
I learned how an Angular application boots up and how components communicate.

### 🔑 Key Concepts

- **Standalone Components**

  - No need for `NgModule`.
  - Components declare their own dependencies via `imports: []`.

- **Component Composition**

  - Building UI using smaller nested components like `Header`, `TaskCard`, etc.

- **@Input Decorator**

  - Used to pass data **from parent → child component**.

- **Interpolation (`{{ }}`)**

  - Render dynamic data inside templates.

---

## 🏗️ 2. Architecture Overview (Visualized)

```
index.html
 └── main.ts               # Bootstraps the application
      └── app.component.ts # Root component
           ├── header.component.ts     # Static UI
           └── task-card.component.ts  # Reusable task card component
```

---

## 💻 3. Code Implementation Highlights

### A. ✅ Child Component — `task-card`

This component receives data using `@Input()`.
It only **displays** the data, it doesn't care where it comes from.

#### **task-card.component.ts**

```ts
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-task-card',
  standalone: true,
  imports: [],
  template: `
    <div class="card">
      <h3>{{ taskTitle }}</h3>
    </div>
  `,
})
export class TaskCardComponent {
  @Input() taskTitle: string = '';
}
```

---

### B. 🏠 Parent Component — `app.component.ts`

The parent imports child components and passes data using **Property Binding** (`[]`).

```ts
import { Component } from '@angular/core';
import { HeaderComponent } from './components/header/header.component';
import { TaskCardComponent } from './components/task-card/task-card.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HeaderComponent, TaskCardComponent],
  template: `
    <app-header></app-header>
    <app-task-card [taskTitle]="firstTask"></app-task-card>
  `,
})
export class AppComponent {
  firstTask = 'Complete Day 1 Notes';
}
```

---

## ⚡ 4. CLI Commands Used

| Command                       | Description                                 |
| ----------------------------- | ------------------------------------------- |
| `ng new task-manager`         | Create a new Angular workspace              |
| `ng serve`                    | Run the local dev server (`localhost:4200`) |
| `ng g c components/header`    | Generate `HeaderComponent`                  |
| `ng g c components/task-card` | Generate `TaskCardComponent`                |

---

## 🧠 5. Interview Prep Corner

### ❓ Q1: Difference between Standalone Components and NgModules?

**Answer:**
Traditional Angular required every component to be declared inside an `NgModule`.
Standalone components remove this requirement — a component declares its own dependencies.

**Benefits:**

- Reduced boilerplate
- Clearer dependency graph
- Easier lazy loading
- Simpler and faster development

---

### ❓ Q2: How do you pass data from parent to child?

**Answer:**
Use `@Input()` in the child and **property binding** in the parent.

**Example:**

```html
<child-comp [data]="parentData"></child-comp>
```

---

## 🎉 End of Day 1
