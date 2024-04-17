import { Route } from '@angular/router';
import { ProfileComponent } from './features/profile/profile.component';
import { ProjectComponent } from './features/project/project.component';

export const appRoutes: Route[] = [
  {
    path: '',
    component: ProfileComponent,
  },
  {
    path: 'project',
    component: ProjectComponent,
  },
];
