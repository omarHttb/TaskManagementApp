import { Component, Input } from '@angular/core';
import { NgClass } from '@angular/common';

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
}
