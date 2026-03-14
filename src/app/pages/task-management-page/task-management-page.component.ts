import { Component, inject, OnInit } from '@angular/core';
import { mockTasksData } from '../../data/mockTasksData';
import { TaskListItemComponent } from '../../components/task-list-item/task-list-item.component';
import { NgClass } from '@angular/common';
import { ITask } from '../../models/itask';
import { TaskService } from '../../services/task.service';
import { PriorityOptions } from '../../models/priorityOptions';
import { StatusOptions } from '../../models/statusOptions';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
@Component({
  selector: 'app-task-management-page',
  standalone: true,
  imports: [TaskListItemComponent, NgClass, FormsModule, RouterLink],
  templateUrl: './task-management-page.component.html',
  styleUrl: './task-management-page.component.css',
})
export class TaskManagementPageComponent implements OnInit {
  private taskService = inject(TaskService);
  private router = inject(Router);
  AllTaskData: ITask[] = [];
  PaginatedTasksData: ITask[] = [];

  DisplayedTask: ITask = {
    id: 0,
    title: '',
    description: '',
    status: 'To Do',
    priority: 'High',
    dueDate: new Date(),
    createdAt: new Date(),
  };
  pageNumber: number = 1;
  pageSize: number = 4;
  title: string = '';

  constructor() {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
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
    if (this.pageNumber >= Math.ceil(this.AllTaskData.length / this.pageSize)) {
      return true;
    } else return false;
  }

  OnFilterStatus(status: StatusOptions) {
    this.pageNumber = 1;
    this.pageSize = 4;
    this.AllTaskData = this.taskService.FilterTasksByStatus(status);
    this.PaginatedTasksData = this.AllTaskData.slice(0, 4);
  }
  OnFilterPriority(priority: PriorityOptions) {
    this.pageNumber = 1;
    this.pageSize = 4;
    this.AllTaskData = this.taskService.FilterTasksByPriority(priority);
    this.PaginatedTasksData = this.AllTaskData.slice(0, 4);
  }

  OnFilterTitle(title: string) {
    if (title != '') {
      this.pageNumber = 1;
      this.pageSize = 4;
      this.AllTaskData = this.taskService.SearchTaskByTitle(title);
      this.PaginatedTasksData = this.AllTaskData.slice(0, 4);
      console.log(this.AllTaskData);
    } else {
      this.AllTaskData = this.taskService.GetAllTasks();
      this.PaginatedTasksData = this.AllTaskData.slice(0, 4);
    }
  }

  GoToTaskPage(task: ITask) {
    this.router.navigate(['/tasks', task.id]);
  }


}
