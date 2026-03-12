import { Routes } from '@angular/router';
import { TaskManagementPageComponent } from './pages/task-management-page/task-management-page.component';
import { TaskPageComponent } from './pages/task-page/task-page.component';

export const routes: Routes = [
  {
    path: '',
    component: TaskManagementPageComponent,
    title: 'Task Management',
  },
  { path: 'Task', component: TaskPageComponent, title: 'Task' },
];
