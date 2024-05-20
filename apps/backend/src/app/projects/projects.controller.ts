import {
  Body,
  Controller,
  Delete,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { UUID } from 'crypto';

import { ProjectsService } from './projects.service';
import { JwtPayload } from '../auth/strategies/jwt.strategy';
import { CreateProjectDto } from './dto/create-project.dto';
import { Project } from './project.entity';
import { CurrentUser } from '../../common/current-user.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.CREATED)
  async create(
    @CurrentUser() userJwtPayload: JwtPayload,
    @Body() createProjectDto: CreateProjectDto
  ): Promise<Project> {
    return this.projectsService.create(userJwtPayload.sub, createProjectDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(
    @CurrentUser() userJwtPayload: JwtPayload,
    @Param('id') projectId: UUID
  ): Promise<void> {
    await this.projectsService.remove(userJwtPayload.sub, projectId);
  }
}
