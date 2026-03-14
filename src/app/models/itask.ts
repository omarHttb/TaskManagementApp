import { PriorityOptions } from './priorityOptions';
import { StatusOptions } from './statusOptions';

export interface ITask {
  id: number;
  title: string;
  description: string;
  status: StatusOptions;
  priority: PriorityOptions;
  dueDate: Date;
  createdAt: Date;
}
