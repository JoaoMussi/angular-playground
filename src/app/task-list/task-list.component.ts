import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { trimmedRequired } from '../shared/validators/trimmed-required.validator';
import { TaskListColumnComponent } from './task-list-column/task-list-column.component';
import { Task } from './task.model';

@Component({
  selector: 'play-task-list',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, TaskListColumnComponent],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.scss',
})
export class TaskListComponent {
  taskName = new FormControl<string>('', {
    nonNullable: true,
    validators: [trimmedRequired()],
  });
  taskList: Task[] = [];

  get pendingTasks(): Task[] {
    return this.getTasks(false);
  }

  get completedTasks(): Task[] {
    return this.getTasks(true);
  }

  addTask(): void {
    if (!this.isValid()) return;

    this.taskList.push({
      name: this.taskName.value!.trim(),
      completed: false,
    });
    this.taskName.reset();
  }

  private getTasks(completed: boolean): Task[] {
    return this.taskList.filter((task) => task.completed === completed);
  }

  private isValid(): boolean {
    let isValid = true;

    if (!this.taskName.value) return false;

    const taskAlreadyExist =
      this.taskList.findIndex((task) => task.name === this.taskName.value) >= 0;
    if (taskAlreadyExist) return false;

    return isValid;
  }
}
