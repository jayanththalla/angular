import { Component, inject, computed } from '@angular/core'; // <--- Import inject, computed
import { HeaderComponent } from './components/header/header';
import { TaskCardComponent } from './components/task-card/task-card';
import { FormsModule } from '@angular/forms';
import { TaskService } from './services/task'; // <--- Import Service

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HeaderComponent, TaskCardComponent, FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class AppComponent {
  // 1. Inject the Service
  // "Hey Angular, give me the TaskService instance."
  private taskService = inject(TaskService);

  // 2. Variables for the Form
  newTaskTitle = '';

  // 3. Read data directly from the service
  // We don't need to define signals here anymore!
  tasks = this.taskService.allTasks;
  
  // 4. Computed signal for total tasks
  totalTasks = computed(() => this.taskService.allTasks().length);

  addTask() {
    if (!this.newTaskTitle.trim()) return;

    // Delegate logic to the service
    this.taskService.addTask(this.newTaskTitle);

    this.newTaskTitle = '';
  }

  deleteTask(id: number) {
    // Delegate logic to the service
    this.taskService.deleteTask(id);
  }

  toggleTask(event: {id: number, isCompleted: boolean}) {
    this.taskService.updateTaskStatus(event.id, event.isCompleted);
  }
}