import { Component } from '@angular/core';
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
  tasks: Task[] = [
    { id: 1, title: 'Complete Day 2 Tutorial', isCompleted: false },
    { id: 2, title: 'Learn Component Input', isCompleted: true },
    { id: 3, title: 'Practice TypeScript Interfaces', isCompleted: false },
  ];
}