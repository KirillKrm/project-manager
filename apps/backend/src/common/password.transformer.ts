import { ValueTransformer } from 'typeorm';
import { Hash } from './hash';

export class PasswordTransformer implements ValueTransformer {
  to(value: string | Buffer) {
    return Hash.make(value);
  }

  from(value: any) {
    return value;
  }
}
