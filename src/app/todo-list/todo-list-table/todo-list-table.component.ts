import { Component, EventEmitter, Input, Output } from '@angular/core';
import { JsonPlaceholderTodo } from '../../core/json-placeholder/todo/todo.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'play-todo-list-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './todo-list-table.component.html',
  styleUrl: './todo-list-table.component.scss',
})
export class TodoListTableComponent {
  @Input() tableName: string = '';
  @Input() todoList: JsonPlaceholderTodo[] = [];
  @Output() deleteTodo: EventEmitter<number> = new EventEmitter();
  @Output() toggleTodo: EventEmitter<number> = new EventEmitter();

  deleteClick(todoId: number): void {
    this.deleteTodo.emit(todoId);
  }

  toggleClick(todoId: number): void {
    this.toggleTodo.emit(todoId);
  }
}
