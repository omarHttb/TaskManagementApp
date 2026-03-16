import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { NgClass } from '@angular/common';
import { TaskService } from '../../services/task.service';
import { Router } from '@angular/router';
import { ITask } from '../../models/itask';

@Component({
  selector: 'app-task-list-item',
  standalone: true,
  imports: [NgClass],
  templateUrl: './task-list-item.component.html',
  styleUrl: './task-list-item.component.css',
})
export class TaskListItemComponent {
  @Input({ required: true }) id!: number;
  @Input({ required: true }) title!: string;
  @Input({ required: true }) priority!: string;
  @Input({ required: true }) status!: string;
  @Output() emitOnDelete = new EventEmitter<void>();

  private router = inject(Router);
  private taskService = inject(TaskService);
  Task: ITask = {
    id: 0,
    title: '',
    description: '',
    status: 'To Do',
    priority: 'Low',
    dueDate: new Date(),
    createdAt: new Date(),
  };

  OnDelete(event: Event, itemId: number) {
    event.stopPropagation();
    const isConfirmed: boolean = confirm(
      'Are you sure you want to delete this task?',
    );

    if (isConfirmed) {
      this.taskService.RemoveTaskItem(itemId);
    } else {
      return;
    }

    this.emitOnDelete.emit();
  }
  MarkAsDone(event: Event) {
    event.stopPropagation();
    this.Task = this.taskService.GetTaskItemById(this.id);

    this.Task.status = 'Done';

    this.taskService.MarkTaskAsDone(this.Task);

    alert('Task marked as done');
  }
  OnEdit(event: Event) {
    this.router.navigate(['/tasks/edit', this.id]);
    event.stopPropagation();
  }
  GoToEditTask(taskId: number) {}
  ViewTask() {}
}
