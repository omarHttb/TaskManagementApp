import { Component, inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { futureDateValidator } from '../../shared/validators/futureDateValidator';
import { CommonModule } from '@angular/common';
import { TaskService } from '../../services/task.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ITask } from '../../models/itask';

@Component({
  selector: 'app-save-task-page',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './save-task-page.component.html',
  styleUrl: './save-task-page.component.css',
})
export class SaveTaskPageComponent implements OnInit {
  taskForm: FormGroup;
  private activatedRoute = inject(ActivatedRoute);
  private taskService = inject(TaskService);
  private router = inject(Router);
  isEditMode: boolean = false;
  taskId: number | null = null;
  task: ITask = {
    id: 0,
    title: '',
    description: '',
    status: 'To Do',
    priority: 'Low',
    dueDate: new Date(),
    createdAt: new Date(),
  };

  constructor(private fb: FormBuilder) {
    this.taskForm = this.fb.group({
      id: [''],
      title: ['', Validators.required],
      description: ['', Validators.required],
      status: ['', Validators.required],
      priority: ['', Validators.required],
      dueDate: [null, [Validators.required, futureDateValidator]],
      createdAt: [new Date()],
    });
  }
  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      if (params['id']) {
        this.activateEditMode(params['id']);
      } else {
        this.isEditMode = false;
      }
    });
  }

  activateEditMode(id: number | null = null) {
    this.isEditMode = true;
    this.taskId = id;
    this.task = this.taskService.GetTaskItemById(Number(this.taskId));

    this.taskForm.patchValue({
      ...this.task,
      dueDate: this.formatDateForInput(this.task.dueDate),
    });
  }

  onSubmit() {
    if (this.taskForm.invalid) {
      this.taskForm.markAllAsTouched();
    } else {
      this.saveTask();
    }
  }

  private formatDateForInput(date: Date): string {
    if (!date) return '';
    const d = new Date(date);
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    const year = d.getFullYear();
    return `${year}-${month}-${day}`;
  }

  saveTask() {
    if (!this.isEditMode) {
      this.taskService.AddTask(this.taskForm.value);
      this.router.navigate(['/tasks']);
    } else {
      this.taskService.updateTask(this.taskForm.value);
      alert('task updated!');
      this.router.navigate(['/tasks/edit', this.taskId]);
    }
  }
}
