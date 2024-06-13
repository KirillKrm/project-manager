import { UUID } from 'crypto';
import { User } from './User';

export type Project = {
  id: UUID;
  title: string;
  user: User;
};
