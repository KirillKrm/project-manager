import { Component } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  FormControl,
  Validators,
  FormsModule,
  ReactiveFormsModule,
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
} from '@angular/material/dialog';
import { merge } from 'rxjs';

@Component({
  selector: 'app-task-create-dialog',
  templateUrl: './task-create-dialog.component.html',
  styleUrl: './task-create-dialog.component.css',
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
export class TaskCreateDialogComponent {
  constructor(public dialogRef: MatDialogRef<TaskCreateDialogComponent>) {
    merge(
      this.title.statusChanges,
      this.title.valueChanges,
      this.status.statusChanges,
      this.priority.statusChanges
    ).pipe(takeUntilDestroyed());
  }

  title = new FormControl('', Validators.required);
  status = new FormControl('', Validators.required);
  priority = new FormControl('', Validators.required);

  errorMessage = 'You must enter a value';
}
