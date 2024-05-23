import { Route } from '@angular/router';
import { LoginComponent } from './features/login/login.component';
import { ProfileComponent } from './features/profile/profile.component';
import { ProjectComponent } from './features/project/project.component';
import { SignupComponent } from './features/signup/signup.component';
import { SettingsComponent } from './features/project/components/settings/settings.component';
import { FinancesComponent } from './features/project/components/finances/finances.component';
import { TasksComponent } from './features/project/components/tasks/tasks.component';
import { authGuard } from './core/auth.guard';

export const appRoutes: Route[] = [
  {
    path: '',
    redirectTo: 'profile',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginComponent,
    title: 'Project Manager | Login',
  },
  {
    path: 'signup',
    component: SignupComponent,
    title: 'Project Manager | Sign Up',
  },
  {
    path: 'profile',
    component: ProfileComponent,
    title: 'Project Manager | Profile',
    canActivate: [authGuard],
  },
  {
    path: 'project/:projectId',
    component: ProjectComponent,
    canActivate: [authGuard],
    children: [
      { path: '', redirectTo: 'tasks', pathMatch: 'full' },
      {
        path: 'tasks',
        title: 'Project Manager | Tasks',
        component: TasksComponent,
      },
      {
        path: 'finances',
        title: 'Project Manager | Finances',
        component: FinancesComponent,
      },
      {
        path: 'settings',
        title: 'Project Manager | Settings',
        component: SettingsComponent,
      },
    ],
  },
];
