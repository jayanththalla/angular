# 📅 Day 4: Template-Driven Forms & Validation

**Date:** 07 Dec 2025
**Focus:** Two-Way Binding (`[(ngModel)]`), Form Validation, User Input Handling

---

## 🚀 1. What I Learned Today

Today I upgraded the app’s input system using **Angular Template-Driven Forms**.

### 🔑 Key Takeaways

- **Two-Way Binding (`[(ngModel)]`)**
  Syncs user input with a TypeScript variable in real-time.

- **Form State Tracking**
  Used template reference variables like `#taskForm="ngForm"` to check validity.

- **Validation Rules**
  Implemented `required` and `minlength`, and displayed errors only when appropriate.

---

## 💻 2. Code Implementation Highlights

---

### A. 🍌 The “Banana-in-a-Box” Syntax — `[(ngModel)]`

This creates a live two-way binding between UI and component logic.

#### **app.component.ts**

```ts
newTaskTitle = ''; // Updating here reflects in the input, and vice versa.
```

#### **app.component.html**

```html
<input [(ngModel)]="newTaskTitle" name="taskName" />
```

---

### B. 🛡️ Validation Logic

Angular gives detailed validation info via `ngModel` control state.

```html
<input [(ngModel)]="newTaskTitle" name="taskName" #myInput="ngModel" required minlength="3" />

@if (myInput.invalid && myInput.touched) {
<div>
  @if (myInput.errors?.['required']) { Field is required } @if (myInput.errors?.['minlength']) { Too
  short }
</div>
}
```

---

## 🧠 3. Interview Prep

### ❓ Q: Why do we need `name="something"` when using `[(ngModel)]` inside a `<form>`?

**Answer:**
When using `ngModel` inside a form, Angular automatically registers that input as a **FormControl**. The `name` attribute acts as the **unique identifier** for that control within the form.

Without it, Angular can't track the field’s validity and throws an error.

### ❓ Q: What’s the difference between **Reactive Forms** and **Template-Driven Forms** in Angular?

**Answer:**

- **Template-Driven Forms** are defined in the template using directives like `ngModel`. They are simpler and suitable for basic forms.
- **Reactive Forms** are defined in the component class using `FormControl` and `FormGroup`. They offer more control and are better for complex forms with dynamic validation.

**Use Template-Driven Forms** for simple scenarios and **Reactive Forms** for complex, dynamic forms.

### ❓ Q: How does Angular handle form validation under the hood?

**Answer:**
Angular uses a combination of **directives** and **form control objects** to manage form validation. Each input field is associated with a `FormControl` that tracks its value, validity, and state (e.g., touched, dirty). Validation rules are applied through directives like `required` and `minlength`, which update the control's validity status in real-time as the user interacts with the form.

### ❓ Q: Can you explain the concept of two-way data binding in Angular?

**Answer:**
Two-way data binding in Angular allows for automatic synchronization of data between the model (component class) and the view (template). This is achieved using the `[(ngModel)]` directive, which combines property binding (`[ngModel]`) and event binding (`(ngModelChange)`). When the user updates the input field, the corresponding variable in the component is updated, and when the variable changes in the component, the input field reflects that change. This creates a seamless interaction between the UI and the underlying data model.

---
