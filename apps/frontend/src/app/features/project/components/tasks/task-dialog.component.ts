import { Component, Inject, OnInit } from '@angular/core';
import {
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

import { Task } from '../../../../types/Task';
import { TasksService } from '../../../../core/services/tasks.service';

@Component({
  selector: 'app-task-dialog',
  templateUrl: './task-dialog.component.html',
  styleUrls: ['./task-dialog.component.css'],
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
export class TaskDialogComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { task?: Task },
    public dialogRef: MatDialogRef<TaskDialogComponent>,
    private formBuilder: FormBuilder,
    private tasksService: TasksService
  ) {}

  ngOnInit() {
    console.log();
  }

  errorMessage = 'You must enter a value';
  title = this.formBuilder.control(this.data.task?.title, Validators.required);
  status = this.formBuilder.control(
    this.data.task?.status,
    Validators.required
  );
  priority = this.formBuilder.control(
    this.data.task?.priority,
    Validators.required
  );
  taskOptions = this.formBuilder.group({
    title: this.title,
    status: this.status,
    priority: this.priority,
  });

  createTask() {
    if (this.taskOptions.valid) {
      //this.tasksService.create(this.taskOptions.value).subscribe();
      this.dialogRef.close();
    }
  }

  editTask() {
    if (this.taskOptions.valid) {
      //this.tasksService.edit(this.data.task?.id, this.taskOptions.value).subscribe();
      this.dialogRef.close();
    }
  }
}
