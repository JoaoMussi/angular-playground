import { Injectable } from '@angular/core';
import { BaseJsonPlaceholderService } from '../base-json-placeholder.service';
import { HttpClient } from '@angular/common/http';
import { JsonPlaceholderTodo, JsonPlaceholderTodoFilter } from './todo.model';

@Injectable({
  providedIn: 'root',
})
export class JsonPlaceholderTodoService extends BaseJsonPlaceholderService<
  JsonPlaceholderTodo,
  JsonPlaceholderTodoFilter
> {
  constructor(override http: HttpClient) {
    super(http, '/todos');
  }
}
