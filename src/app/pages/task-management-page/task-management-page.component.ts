import { Component, inject, OnInit } from '@angular/core';
import { mockTasksData } from '../../data/mockTasksData';
import { TaskListItemComponent } from '../../components/task-list-item/task-list-item.component';
import { NgClass } from '@angular/common';
import { TaskComponent } from '../../components/task/task.component';
import { ITask } from '../../models/itask';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-task-management-page',
  standalone: true,
  imports: [TaskListItemComponent, NgClass, TaskComponent],
  templateUrl: './task-management-page.component.html',
  styleUrl: './task-management-page.component.css',
})
export class TaskManagementPageComponent implements OnInit {
  private taskService = inject(TaskService);
  AllTaskData: ITask[] = [];
  PaginatedTasksData: ITask[] = [];

  DisplayedTask: ITask = {
    id: 0,
    title: '',
    description: '',
    statusOptions: 'To Do',
    priority: 'High',
    dueDate: new Date(),
    CreatedAt: new Date(),
  };
  pageNumber: number = 1;
  pageSize: number = 4;

  constructor() {}

  ngOnInit(): void {
    this.AllTaskData = this.taskService.GetAllTasks();
    this.PaginatedTasksData = this.AllTaskData.slice(0, 4);
  }

  changeNextPage(pageNumber: number) {
    let startIndex = (pageNumber - 1) * this.pageSize;
    let endIndex = startIndex + this.pageSize;
    this.PaginatedTasksData = this.AllTaskData.slice(startIndex, endIndex);

    this.pageNumber++;
  }

  changePreviousPage(pageNumber: number) {
    let startIndex = (pageNumber - 1) * this.pageSize;
    let endIndex = startIndex + this.pageSize;
    this.PaginatedTasksData = this.AllTaskData.slice(startIndex, endIndex);
    this.pageNumber--;
  }

  isLastPage() {
    if (this.pageNumber >= Math.ceil(mockTasksData.length / this.pageSize)) {
      return true;
    } else return false;
  }

  changeTask(data: ITask) {
    this.DisplayedTask = data;
  }
}
