import { UUID } from 'crypto';

export type User = {
  id: UUID;
  username: string;
  photo: string;
  email: string;
};
