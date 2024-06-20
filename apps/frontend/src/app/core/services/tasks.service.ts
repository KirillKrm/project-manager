import { Injectable } from '@angular/core';
import { Task } from '../../types/Task';

@Injectable({
  providedIn: 'root',
})
export class TasksService {
  getTasks(): Task[] {
    return [];
  }
}
