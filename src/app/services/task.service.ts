import { Injectable } from '@angular/core';
import { mockTasksData } from '../data/mockTasksData';
import { ITask } from '../models/itask';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  constructor() {}

  private storageKey = 'tasks';

  StoreTasksToLocalStorage() {
    localStorage.setItem(this.storageKey, JSON.stringify(mockTasksData));
  }

  GetTaskItem(taskId: number) {
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

  addTask(task: ITask) {
    const tasks = this.GetAllTasks();
    tasks.push(task);
    localStorage.setItem(this.storageKey, JSON.stringify(tasks));
  }
}
