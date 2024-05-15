import {
  ConflictException,
  HttpException,
  HttpStatus,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UUID } from 'crypto';

import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { CreateGoogleUserDto } from './dto/create-google-user.dto';

@Injectable()
export class UsersService {
  private readonly logger = new Logger(UsersService.name);

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const checkByEmail = await this.userRepository.findOneBy({
      email: createUserDto.email,
    });
    if (checkByEmail) {
      throw new ConflictException('Email address already taken');
    }

    const res = await this.userRepository.save(createUserDto);
    this.logger.log(`User ${res.id} created successfully`);

    return res;
  }

  async createGoogleUser(
    createGoogleUserDto: CreateGoogleUserDto
  ): Promise<User> {
    const checkByEmail = await this.userRepository.findOneBy({
      email: createGoogleUserDto.email,
    });
    if (checkByEmail) {
      throw new ConflictException('Email address already taken');
    }

    const res = await this.userRepository.save(createGoogleUserDto);
    this.logger.log(`User ${res.id} created successfully`);

    return res;
  }

  async findOne(id: UUID): Promise<User> {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    this.logger.log(`User ${user.id} fetched successfully`);

    return user;
  }

  async findOneByEmail(email: string): Promise<User> {
    const user = await this.userRepository.findOneBy({ email });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    this.logger.log(`User ${user.id} fetched successfully`);

    return user;
  }

  async remove(id: UUID): Promise<User> {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const res = await this.userRepository.delete(id);
    this.logger.log(`User ${user.id} deleted successfully`);

    return user;
  }
}
