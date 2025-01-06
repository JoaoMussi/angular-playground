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
    path: 'todo-list',
    loadComponent: () =>
      import('./todo-list/todo-list.component').then(
        (m) => m.TodoListComponent
      ),
  },
];
