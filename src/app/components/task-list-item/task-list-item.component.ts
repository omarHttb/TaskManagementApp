import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { NgClass } from '@angular/common';
import { TaskService } from '../../services/task.service';
import { Router } from '@angular/router';

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
  @Output() emitOnDelete = new EventEmitter<void>();

  private router = inject(Router);
  private taskService = inject(TaskService);

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

  OnEdit(event: Event) {
    this.router.navigate(['/tasks/edit', this.id]);
    event.stopPropagation();
  }
  GoToEditTask(taskId: number) {}
  ViewTask() {}
}
