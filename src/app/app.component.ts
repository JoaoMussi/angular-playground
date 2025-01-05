import { Component } from '@angular/core';
import { TaskListComponent } from './task-list/task-list.component';
import { LoginComponent } from './login/login.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [TaskListComponent, LoginComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {}
