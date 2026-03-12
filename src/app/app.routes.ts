import { Routes } from '@angular/router';
import { TaskManagementPageComponent } from './pages/task-management-page/task-management-page.component';

export const routes: Routes = [

    { path: '', component: TaskManagementPageComponent, title: 'Task Management' }
];
