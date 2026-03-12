import { PriorityOptions } from './priorityOptions';
import { StatusOptions } from './statusOptions';

export interface ITask {
  id: number;
  title: string;
  description: string;
  statusOptions: StatusOptions;
  priority: PriorityOptions;
  dueDate: Date;
  CreatedAt: Date;
}
