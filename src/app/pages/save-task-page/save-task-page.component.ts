import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { futureDateValidator } from '../../shared/validators/futureDateValidator';
import { CommonModule } from '@angular/common';
import { TaskService } from '../../services/task.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-save-task-page',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './save-task-page.component.html',
  styleUrl: './save-task-page.component.css',
})
export class SaveTaskPageComponent {
  taskForm: FormGroup;
  private taskService = inject(TaskService);
  private router = inject(Router);
  isEditMode: boolean = false;

  constructor(private fb: FormBuilder) {
    this.taskForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      status: ['', Validators.required],
      priority: ['', Validators.required],
      dueDate: [null, [Validators.required, futureDateValidator]],
      createdAt: [new Date()],
    });
  }

  onSubmit() {
    if (this.taskForm.invalid) {
      this.taskForm.markAllAsTouched();
    } else {
      this.saveTask();
    }
  }

  saveTask() {
    if (!this.isEditMode) {
      this.taskService.AddTask(this.taskForm.value);
      this.router.navigate(['/tasks']);
    } else {
      console.log('is edit mode');
    }
  }
}
