import { Component, OnInit, signal, WritableSignal } from '@angular/core';
import { take } from 'rxjs';
import { JsonPlaceholderTodo } from '../core/json-placeholder/todo/todo.model';
import { JsonPlaceholderTodoService } from '../core/json-placeholder/todo/todo.service';
import { TodoListInputComponent } from './todo-list-input/todo-list-input.component';
import { TodoListTableComponent } from './todo-list-table/todo-list-table.component';

@Component({
  selector: 'play-todo-list',
  standalone: true,
  imports: [TodoListInputComponent, TodoListTableComponent],
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.scss',
})
export class TodoListComponent implements OnInit {
  todoList: WritableSignal<JsonPlaceholderTodo[]> = signal([]);

  constructor(private todoService: JsonPlaceholderTodoService) {}

  ngOnInit(): void {
    this.todoService.getAll().pipe(take(1)).subscribe(this.todoList.set);
  }

  addTodo(todoName: string): void {
    this.todoService
      .post({
        userId: 1,
        title: todoName,
        completed: false,
      })
      .pipe(take(1))
      .subscribe((response) =>
        this.todoList.update((values) => [response, ...values])
      );
  }

  getTodoListByStatus(completed: boolean): JsonPlaceholderTodo[] {
    return this.todoList().filter((todo) => todo.completed === completed);
  }

  deleteTodo(todoId: number): void {
    this.todoService
      .delete(todoId)
      .pipe(take(1))
      .subscribe(() => {
        this.todoList.update((values) =>
          values.filter((value) => value.id !== todoId)
        );
      });
  }

  toggleTodo(todoId: number): void {
    const todo = this.todoList().find((todo) => todo.id === todoId);

    this.todoService
      .patch(todoId, { completed: !todo?.completed })
      .pipe(take(1))
      .subscribe((response: JsonPlaceholderTodo) => {
        this.todoList.update((values: JsonPlaceholderTodo[]) => {
          return values.map((value: JsonPlaceholderTodo) =>
            value.id === todoId ? response : value
          );
        });
      });
  }
}
