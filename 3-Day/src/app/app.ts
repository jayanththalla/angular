import { Component, signal, computed } from '@angular/core';
import { HeaderComponent } from './components/header/header'; // Import Header
import { TaskCardComponent } from './components/task-card/task-card'; // Import Card
import { Task } from './models/task.models'; // Import Task model

@Component({
  selector: 'app-root',
  standalone: true,
  // IMPORTANT: You must list imports here to use them in the HTML
  imports: [HeaderComponent, TaskCardComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class AppComponent {
  // This is a simple variable we will pass down
  firstTask = 'Learn Angular Basics';
  secondTask = 'Build a Project';
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
  addTask(title: string) {
    if (!title) return;

    const newTask: Task = {
      id: Date.now(), // simple unique ID based on timestamp
      title: title,
      isCompleted: false
    };

    // To update a signal, we use the .update() method
    // 'prev' gives us the current list, and we return the new list
    this.tasks.update((prevTasks) => [...prevTasks, newTask]);
  }

  // 4. Method to Delete a Task
  deleteTask(id: number) {
    this.tasks.update((prevTasks) => prevTasks.filter(t => t.id !== id));
  }

}