import { Routes } from '@angular/router';
import { TaskManagementPageComponent } from './pages/task-management-page/task-management-page.component';
import { TaskPageComponent } from './pages/task-page/task-page.component';
import { SaveTaskPageComponent } from './pages/save-task-page/save-task-page.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/tasks',
    pathMatch: 'full',
  },
  {
    path: 'tasks',
    children: [
      {
        path: '',
        component: TaskManagementPageComponent,
        title: 'Task Management',
      },
      { path: 'new', component: SaveTaskPageComponent, title: 'New Task' },
      {
        path: 'edit/:id',
        component: SaveTaskPageComponent,
        title: 'Edit Task',
      },
      { path: ':id', component: TaskPageComponent, title: 'Task' },
    ],
  },
  { path: '**', redirectTo: '/tasks' },
];
