import { Component, Input } from '@angular/core';
import { Task } from '../task.model';
import { CommonModule } from '@angular/common';
import { HighlightColorDirective } from '../../shared/directives/highlight-color.directive';

@Component({
  selector: 'play-task-list-column',
  standalone: true,
  imports: [CommonModule, HighlightColorDirective],
  templateUrl: './task-list-column.component.html',
  styleUrl: './task-list-column.component.scss',
})
export class TaskListColumnComponent {
  @Input() name!: string;
  @Input() taskList!: Task[];

  toggleTask(task: Task): void {
    task.completed = !task.completed;
  }
}
