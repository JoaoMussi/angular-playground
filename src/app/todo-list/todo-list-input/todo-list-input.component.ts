import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'play-todo-list-input',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './todo-list-input.component.html',
  styleUrl: './todo-list-input.component.scss',
})
export class TodoListInputComponent {
  @Output() addTask: EventEmitter<string> = new EventEmitter();

  todoName = '';

  addButtonClick(): void {
    this.addTask.emit(this.todoName);
  }
}
