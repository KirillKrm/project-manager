import {
  ForbiddenException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UUID } from 'crypto';

import { UsersService } from '../users/users.service';
import { Project } from './project.entity';
import { CreateProjectDto } from './dto/create-project.dto';

@Injectable()
export class ProjectsService {
  private readonly logger = new Logger(ProjectsService.name);

  constructor(
    @InjectRepository(Project)
    private readonly projectRepository: Repository<Project>,
    private readonly usersService: UsersService
  ) {}

  async create(
    userId: UUID,
    createProjectDto: CreateProjectDto
  ): Promise<Project> {
    const user = await this.usersService.findOne(userId);

    const newProject = Object.assign(new Project(), {
      ...createProjectDto,
      user: user,
    });

    const res = await this.projectRepository.save(newProject);
    this.logger.log(`Project ${res.id} created successfully`);

    return res;
  }

  async remove(userId: UUID, projectId: UUID): Promise<Project> {
    const project = await this.projectRepository.findOne({
      where: { id: projectId },
      relations: { user: true },
    });
    if (!project) {
      throw new NotFoundException('Project not found');
    }

    if (project.user.id !== userId) {
      throw new ForbiddenException(
        'You do not have permission to update this resource.'
      );
    }

    const res = await this.projectRepository.delete({ id: projectId });
    this.logger.log(`Project ${projectId} deleted successfully`);

    return project;
  }
}
