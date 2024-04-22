import { Route } from '@angular/router';
import { ProfileComponent } from './features/profile/profile.component';
import { ProjectComponent } from './features/project/project.component';
import { TasksComponent } from './features/project/components/tasks/tasks.component';
import { FinancesComponent } from './features/project/components/finances/finances.component';
import { SettingsComponent } from './features/project/components/settings/settings.component';

export const appRoutes: Route[] = [
  {
    path: '',
    title: 'Project Manager',
    component: ProfileComponent,
  },
  {
    path: 'project/:projectId',
    component: ProjectComponent,
    children: [
      {
        path: '',
        redirectTo: 'tasks',
        pathMatch: 'full',
      },
      {
        path: 'tasks',
        title: 'Tasks',
        component: TasksComponent,
      },
      {
        path: 'finances',
        title: 'Finances',
        component: FinancesComponent,
      },
      {
        path: 'settings',
        title: 'Settings',
        component: SettingsComponent,
      },
    ],
  },
];
