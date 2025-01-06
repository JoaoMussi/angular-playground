import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'search-users',
    loadComponent: () =>
      import('./search-users/search-users.component').then(
        (m) => m.SearchComponent
      ),
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./login/login.component').then((m) => m.LoginComponent),
  },
  {
    path: 'task-list',
    loadComponent: () =>
      import('./task-list/task-list.component').then(
        (m) => m.TaskListComponent
      ),
  },
];
