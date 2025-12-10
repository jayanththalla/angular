import { Component, Input, Output, EventEmitter } from '@angular/core';
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
  @Input({ required: true }) task!: Task;

  // Create an event emitter to send data UP to the parent
  @Output() deleteEvent = new EventEmitter<number>();
  @Output() statusEvent = new EventEmitter<{ id: number, isCompleted: boolean }>();

  onDelete() {
    // Emit the ID of the task to be deleted
    this.deleteEvent.emit(this.task.id);
  }

  onStatusChange(event: any) {
    // Emit the ID of the task and new status
    this.statusEvent.emit({ id: this.task.id, isCompleted: event.target.checked });
  }
}
