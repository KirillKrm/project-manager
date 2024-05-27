import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';

import { AuthService } from '../../core/auth.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, RouterModule, MatDividerModule, MatButtonModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent {
  projects = ['Project A', 'Project B', 'Project C'];

  constructor(private authService: AuthService, private router: Router) {}

  clickLogout(event: MouseEvent): void {
    this.authService.logout();
    this.router.navigate(['/login']);
    event.stopPropagation();
  }
}
