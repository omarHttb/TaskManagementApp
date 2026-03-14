import { DatePipe, NgClass } from '@angular/common';
import { Component, inject, Input, OnInit } from '@angular/core';
import { ITask } from '../../models/itask';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-task-page',
  standalone: true,
  imports: [NgClass, DatePipe],
  templateUrl: './task-page.component.html',
  styleUrl: './task-page.component.css',
})
export class TaskPageComponent implements OnInit {
  taskId: string | null = null;
  private taskService = inject(TaskService);
  private router = inject(Router);
  task: ITask = {
    id: 0,
    title: '',
    description: '',
    status: 'To Do',
    priority: 'Low',
    dueDate: new Date(),
    createdAt: new Date(),
  };

  constructor(private route: ActivatedRoute) {}
  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.taskId = params.get('id');
    });

    this.task = this.taskService.GetTaskItemById(Number(this.taskId));
  }

  OnDelete() {
    const isConfirmed: boolean = confirm(
      'Are you sure you want to delete this task?',
    );

    if (isConfirmed) {
      this.taskService.RemoveTaskItem(Number(this.taskId));
      this.router.navigate(['/tasks']);
    } else {
      return;
    }
  }
  OnEdit() {
    this.router.navigate(['/tasks/edit', this.taskId]);
  }
}
