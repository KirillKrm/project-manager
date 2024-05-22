import { Logger, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';
import { validateSync } from 'class-validator';

import { EnvConfigSchema } from '../config/env.config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { GlobalJwtModule } from './auth/jwt.module';
import { User } from './users/user.entity';
import { UsersModule } from './users/users.module';
import { Project } from './projects/project.entity';
import { ProjectsModule } from './projects/projects.module';
import { Task } from './tasks/task.entity';
import { TasksModule } from './tasks/tasks.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validate: (config: Record<string, unknown>) => {
        const envConfig = Object.assign(new EnvConfigSchema(), config);
        const errors = validateSync(envConfig);
        if (errors.length > 0) {
          console.error(errors);
          throw new Error(
            `Config validation error:\n ${JSON.stringify(errors)}`
          );
        }

        return envConfig;
      },
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) =>
        ({
          type: configService.get('DB_TYPE'),
          host: configService.get('DB_HOST'),
          port: configService.get('DB_PORT'),
          username: configService.get('DB_USERNAME'),
          password: configService.get('DB_PASSWORD'),
          database: configService.get('DB_DATABASE'),
          entities: [User, Project, Task],
          synchronize: true,
        } as TypeOrmModuleAsyncOptions),
    }),
    GlobalJwtModule,
    PassportModule.register({ session: true }),
    AuthModule,
    UsersModule,
    ProjectsModule,
    TasksModule,
  ],
  controllers: [AppController],
  providers: [AppService, Logger],
})
export class AppModule {}
