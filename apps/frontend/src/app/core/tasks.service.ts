import { Injectable } from '@angular/core';
import { Task } from '../shared/Task';

@Injectable({
  providedIn: 'root',
})
export class TasksService {
  getTasks(): Task[] {
    return [];
  }
}
