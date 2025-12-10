import { Injectable, signal, computed } from '@angular/core';
import { Task } from '../models/task.models';

@Injectable({
  providedIn: 'root' // <--- This makes the service available everywhere (Singleton)
})
export class TaskService {

  // 1. Private Writable Signal (Only this service can change it)
  private taskList = signal<Task[]>([
    { id: 1, title: 'Master Angular Services', isCompleted: false },
    { id: 2, title: 'Learn Dependency Injection', isCompleted: true },
  ]);

  // 2. Public Read-Only Signal (Components can only read this)
  // .asReadonly() is a security feature
  readonly allTasks = this.taskList.asReadonly();

  // 3. Logic moved from Component
  addTask(title: string) {
    const newTask: Task = {
      id: Date.now(),
      title: title,
      isCompleted: false
    };
    this.taskList.update(prev => [...prev, newTask]);
  }

  deleteTask(id: number) {
    this.taskList.update(prev => prev.filter(t => t.id !== id));
  }

  updateTaskStatus(id: number, isCompleted: boolean) {
    this.taskList.update(prev =>
      prev.map(t => t.id === id ? { ...t, isCompleted } : t)
    );
  }
}