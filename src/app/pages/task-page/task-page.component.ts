import { DatePipe, NgClass } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ITask } from '../../models/itask';
import { Router } from '@angular/router';

@Component({
  selector: 'app-task-page',
  standalone: true,
  imports: [NgClass, DatePipe],
  templateUrl: './task-page.component.html',
  styleUrl: './task-page.component.css',
})
export class TaskPageComponent {
  receivedData: any;
  Task: ITask = {
    id: 0,
    title: '',
    description: '',
    statusOptions: 'To Do',
    priority: 'Low',
    dueDate: new Date(),
    CreatedAt: new Date(),
  };
  constructor(private router: Router) {
    const navigation = this.router.getCurrentNavigation();
    this.receivedData = navigation?.extras.state?.['data'];
    this.Task = this.receivedData;
  }

  OnDelete() {}
  OnEdit() {}
}
