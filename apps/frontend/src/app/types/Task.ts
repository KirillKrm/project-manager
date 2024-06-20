import { UUID } from 'crypto';
import { Project } from './Project';

export type Task = {
  id: UUID;
  project: Project;
  title: string;
  status: 'To Do' | 'Done';
  priority: 'Low' | 'Normal' | 'High';
};
