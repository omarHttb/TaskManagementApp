import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { NgClass } from '@angular/common';
import { TaskService } from '../../services/task.service';

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

  private taskService = inject(TaskService);

  OnDelete(event: Event, itemId: number) {
    event.stopPropagation();
    this.taskService.RemoveTaskItem(itemId);
    this.emitOnDelete.emit();
  }

  OnEdit(event: Event) {
    event.stopPropagation();
    console.log('edit');
  }

  ViewTask() {
    console.log('view task');
  }
}
