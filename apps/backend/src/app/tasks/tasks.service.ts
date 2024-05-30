import {
  ForbiddenException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { DeleteResult, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UUID } from 'crypto';

import { Task } from './task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { ProjectsService } from '../projects/projects.service';

@Injectable()
export class TasksService {
  private readonly logger = new Logger(TasksService.name);

  constructor(
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,
    private readonly projectsService: ProjectsService
  ) {}

  async create(createTaskDto: CreateTaskDto): Promise<Task> {
    const project = await this.projectsService.findOne(createTaskDto.projectId);

    const newTask = Object.assign(new Task(), {
      project,
      title: createTaskDto.title,
      status: createTaskDto.status,
      priority: createTaskDto.priority,
    });

    const res = await this.taskRepository.save(newTask);
    this.logger.log(`Task ${res.id} created successfully`);

    return res;
  }

  async remove(userId: UUID, taskId: UUID): Promise<DeleteResult> {
    const task = await this.taskRepository.findOne({
      where: { id: taskId },
      relations: ['project.user.id'],
    });
    if (!task) {
      throw new NotFoundException('Task not found');
    }

    if (task.project.user.id !== userId) {
      throw new ForbiddenException(
        'You do not have permission to update this resource.'
      );
    }

    const res = await this.taskRepository.delete({ id: taskId });
    this.logger.log(`Task ${taskId} deleted successfully`);

    return res;
  }

  async findAll(): Promise<Task[]> {
    const tasks = await this.taskRepository.find({
      relations: { project: { user: true } },
    });
    if (!tasks) {
      throw new NotFoundException('Tasks not found');
    }
    this.logger.log(`${tasks.length} tasks fetched successfully`);

    return tasks;
  }
}
