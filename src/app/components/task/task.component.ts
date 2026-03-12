import { Component, Input } from '@angular/core';
import { DatePipe, NgClass } from '@angular/common';

@Component({
  selector: 'app-task',
  standalone: true,
  imports: [DatePipe, NgClass],
  templateUrl: './task.component.html',
  styleUrl: './task.component.css',
})
export class TaskComponent {
  @Input({ required: true }) title!: string;
  @Input({ required: true }) description!: string;
  @Input({ required: true }) status!: string;
  @Input({ required: true }) priority!: string;
  @Input({ required: true }) dueDate!: Date;
  @Input({ required: true }) createdAt!: Date;
}
