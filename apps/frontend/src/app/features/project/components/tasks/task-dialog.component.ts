import { Component, Inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  FormControl,
  Validators,
  FormsModule,
  ReactiveFormsModule,
  FormBuilder,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import {
  MatDialogRef,
  MatDialogActions,
  MatDialogClose,
  MatDialogTitle,
  MatDialogContent,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { merge } from 'rxjs';

import { Task } from './tasks.component';

@Component({
  selector: 'app-task-dialog',
  templateUrl: './task-dialog.component.html',
  styleUrl: './task-dialog.component.css',
  standalone: true,
  imports: [
    MatDialogActions,
    MatDialogClose,
    MatDialogTitle,
    MatDialogContent,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
  ],
})
export class TaskDialogComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { task?: Task },
    public dialogRef: MatDialogRef<TaskDialogComponent>,
    private formBuilder: FormBuilder
  ) {
    merge(
      this.title.statusChanges,
      this.title.valueChanges,
      this.status.statusChanges,
      this.priority.statusChanges
    ).pipe(takeUntilDestroyed());
  }

  errorMessage = 'You must enter a value';

  title = new FormControl(this.data.task?.title, Validators.required);
  status = new FormControl(this.data.task?.status, Validators.required);
  priority = new FormControl(this.data.task?.priority, Validators.required);
  taskOptions = this.formBuilder.group({
    title: this.title,
    status: this.status,
    priority: this.priority,
  });

  createTask(): void {
    console.log('Create task', this.taskOptions.value);
  }

  editTask(): void {
    console.log('Edit task', this.taskOptions.value);
  }
}
