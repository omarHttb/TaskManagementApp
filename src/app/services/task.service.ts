import { Injectable } from '@angular/core';
import { mockTasksData } from '../data/mockTasksData';
import { ITask } from '../models/itask';
import { StatusOptions } from '../models/statusOptions';
import { PriorityOptions } from '../models/priorityOptions';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  constructor() {}

  private storageKey = 'tasks';

  StoreTasksToLocalStorage() {
    const data = localStorage.getItem(this.storageKey);

    if (data == null) {
      localStorage.setItem(this.storageKey, JSON.stringify(mockTasksData));
    }
  }

  GetTaskItemById(taskId: number) {
    const data = localStorage.getItem(this.storageKey);

    if (data) {
      const tasks = JSON.parse(data);

      const task = tasks.find((taskToFind: ITask) => taskToFind.id === taskId);

      return task;
    }
  }

  GetAllTasks() {
    const data = localStorage.getItem(this.storageKey);
    if (data) return JSON.parse(data);
  }

  updateTask(updatedTask: ITask): void {
    const tasks = this.GetAllTasks();

    const index = tasks.findIndex((task: ITask) => task.id === updatedTask.id);

    if (index !== -1) {
      tasks[index] = updatedTask;
      localStorage.setItem(this.storageKey, JSON.stringify(tasks));
    }
  }

  RemoveTaskItem(taskId: number) {
    const tasks = this.GetAllTasks().filter(
      (task: ITask) => task.id !== taskId,
    );
    localStorage.setItem(this.storageKey, JSON.stringify(tasks));
  }

  AddTask(task: ITask) {
    const tasks = this.GetAllTasks();
    tasks.push(task);
    localStorage.setItem(this.storageKey, JSON.stringify(tasks));
  }

  SearchTaskByTitle(title: string) {
    const data = localStorage.getItem(this.storageKey);

    if (data) {
      const allTasks: ITask[] = JSON.parse(data);

      const searchTerm = title.trim().toLowerCase();

      const filteredTasks = allTasks.filter((task: ITask) =>
        task.title.toLowerCase().includes(searchTerm),
      );

      return filteredTasks;
    }

    return [];
  }

  FilterTasksByStatus(status: StatusOptions) {
    const data = localStorage.getItem(this.storageKey);
    if (data) {
      var filteredTasks = JSON.parse(data);

      filteredTasks = filteredTasks.filter(
        (task: ITask) => task.statusOptions === status,
      );

      return filteredTasks;
    }
  }

  FilterTasksByPriority(priority: PriorityOptions) {
    const data = localStorage.getItem(this.storageKey);
    if (data) {
      var filteredTasks = JSON.parse(data);

      filteredTasks = filteredTasks.filter(
        (task: ITask) => task.priority === priority,
      );

      return filteredTasks;
    }
  }
}
