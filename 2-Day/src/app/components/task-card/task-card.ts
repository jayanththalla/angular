import { Component, Input } from '@angular/core';
import { Task } from '../../models/task.models';
import { CommonModule } from '@angular/common'; // Import this for [ngClass]

@Component({
  selector: 'app-task-card',
  standalone: true,
  imports: [CommonModule], // We don't need extra tools here yet
  templateUrl: './task-card.html',
  styleUrl: './task-card.scss'
})
export class TaskCardComponent {
  // @Input acts as a doorway for data to come IN from the parent
  @Input() taskTitle: string = '';
  @Input({ required: true }) task!: Task;
}
