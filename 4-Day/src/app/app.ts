import { Component, signal, computed } from '@angular/core';
import { HeaderComponent } from './components/header/header'; // Import Header
import { TaskCardComponent } from './components/task-card/task-card'; // Import Card
import { Task } from './models/task.models'; // Import Task model
import { FormsModule } from "@angular/forms";

@Component({
  selector: 'app-root',
  standalone: true,
  // IMPORTANT: You must list imports here to use them in the HTML
  imports: [HeaderComponent, TaskCardComponent, FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class AppComponent {
  // This is a simple variable we will pass down
  firstTask = 'Learn Angular Basics';
  secondTask = 'Build a Project';
  newTaskTitle = '';
  // 1. Define the Signal. We initialize it with our default data.
  // notice the <Task[]> generic type safety.
  tasks = signal<Task[]>([
    { id: 1, title: 'Master Angular Signals', isCompleted: false },
    { id: 2, title: 'Build a Project', isCompleted: true },
  ]);

  // 2. A Computed Signal.
  // This automatically updates whenever 'tasks' changes.
  totalTasks = computed(() => this.tasks().length);


  // 3. Method to Add a Task (Updating the signal)
  addTask() {
    // Validation: Don't add if empty or just spaces
    if (this.newTaskTitle.trim().length === 0) {
      return;
    }

    const newTask: Task = {
      id: Date.now(),
      title: this.newTaskTitle, // Use the class property
      isCompleted: false
    };

    this.tasks.update((prevTasks) => [...prevTasks, newTask]);

    // Reset the input field simply by clearing the variable!
    this.newTaskTitle = '';
  }

  // 4. Method to Delete a Task
  deleteTask(id: number) {
    this.tasks.update((prevTasks) => prevTasks.filter(t => t.id !== id));
  }

}