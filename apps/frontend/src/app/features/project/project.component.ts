import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'app-project',
  standalone: true,
  imports: [CommonModule, RouterModule, MatIconModule, MatDividerModule],
  templateUrl: './project.component.html',
  styleUrl: './project.component.css',
})
export class ProjectComponent {
  menuButtons = [
    { name: 'Back', icon: 'arrow_back', url: '/' },
    { name: 'Tasks', icon: 'task_alt', url: './tasks' },
    {
      name: 'Finances',
      icon: 'account_balance_wallet',
      url: './finances',
    },
    { name: 'Settings', icon: 'settings', url: './settings' },
  ];
}
