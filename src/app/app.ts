import { Component } from '@angular/core';
import { HeaderComponent } from './components/header/header'; // Import Header
import { TaskCardComponent } from './components/task-card/task-card'; // Import Card

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
}