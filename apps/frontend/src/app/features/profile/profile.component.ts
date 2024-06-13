import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';

import { AuthService } from '../../core/auth.service';
import { UserService } from '../../core/user.service';
import { ProjectsService } from '../../core/projects.service';
import { Project } from '../../shared/Project';
import { User } from '../../shared/User';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatDividerModule,
    MatButtonModule,
    MatIcon,
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent implements OnInit {
  projects: Project[] = [];
  user: User | undefined;
  defaultPhotoUrl =
    'https://media.istockphoto.com/id/1300845620/vector/user-icon-flat-isolated-on-white-background-user-symbol-vector-illustration.jpg?s=612x612&w=0&k=20&c=yBeyba0hUkh14_jgv1OKqIH0CCSWU_4ckRkAoy2p73o=';

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private projectsService: ProjectsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.projectsService
      .getProjects()
      .subscribe((projects) => (this.projects = projects));

    this.userService.getMe().subscribe((user) => (this.user = user));
  }

  clickLogout(event: MouseEvent): void {
    this.authService.logout();
    this.router.navigate(['/login']);
    event.stopPropagation();
  }
}
