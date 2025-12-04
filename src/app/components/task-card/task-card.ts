import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-task-card',
  standalone: true,
  imports: [], // We don't need extra tools here yet
  templateUrl: './task-card.html',
  styleUrl: './task-card.scss'
})
export class TaskCardComponent {
  // @Input acts as a doorway for data to come IN from the parent
  @Input() taskTitle: string = '';
}