import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TaskManagementPageComponent } from './pages/task-management-page/task-management-page.component';
import { TaskService } from './services/task.service';
import { TaskPageComponent } from './pages/task-page/task-page.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  private taskService = inject(TaskService);

  ngOnInit(): void {
    this.taskService.StoreTasksToLocalStorage();
  }
  title = 'TaskManagementApp';

}
