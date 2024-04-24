import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatDialog } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTableModule } from '@angular/material/table';
import { Sort, MatSortModule } from '@angular/material/sort';

import { FilterPipe } from './filter.pipe';
import { TaskCreateDialogComponent } from './task-create-dialog.component';

export interface Task {
  title: string;
  status: string;
  priority: string;
}

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatFormFieldModule,
    MatTableModule,
    MatSortModule,
    FilterPipe,
    MatInputModule,
  ],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css',
})
export class TasksComponent {
  tasks: Task[] = [
    { title: 'Task 3', status: 'To Do', priority: 'Normal' },
    { title: 'Task 1', status: 'Done', priority: 'Low' },
    { title: 'Task 2', status: 'To Do', priority: 'High' },
    { title: 'Task 4', status: 'Done', priority: 'Normal' },
  ];

  constructor(public dialog: MatDialog) {}

  public filter!: string;
  public sortedTasks: Task[] = this.tasks;

  applyFilter(event: Event) {
    this.filter = (event.target as HTMLInputElement).value.trim().toLowerCase();
  }

  sortData(sort: Sort) {
    const data = this.sortedTasks.slice();
    if (!sort.active || sort.direction === '') {
      this.sortedTasks = data;
      return;
    }

    this.sortedTasks = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'title':
          return this.compare(a.title, b.title, isAsc);
        case 'status':
          return this.compare(a.status, b.status, isAsc);
        case 'priority':
          return this.compare(a.priority, b.priority, isAsc);
        default:
          return 0;
      }
    });
  }

  compare(a: string, b: string, isAsc: boolean) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }

  openDialog(
    enterAnimationDuration: string,
    exitAnimationDuration: string
  ): void {
    this.dialog.open(TaskCreateDialogComponent, {
      width: '250px',
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }
}
