import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskListComponent } from './task-list.component';
import { Task } from './task.model';

const mockTasks: Task[] = [
  {
    name: 'First task',
    completed: true,
  },
  {
    name: 'Second task',
    completed: false,
  },
  {
    name: 'Third task',
    completed: false,
  },
];

describe('TaskListComponent', () => {
  let component: TaskListComponent;
  let fixture: ComponentFixture<TaskListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskListComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TaskListComponent);
    component = fixture.componentInstance;
    component.taskName.setValue('');
    component.taskList = [];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get pending tasks', () => {
    component.taskList = mockTasks;

    const expectedTasks = [
      {
        name: 'Second task',
        completed: false,
      },
      {
        name: 'Third task',
        completed: false,
      },
    ];
    expect(component.pendingTasks).toEqual(expectedTasks);
  });

  it('should get completed tasks', () => {
    component.taskList = mockTasks;

    const expectedTasks = [
      {
        name: 'First task',
        completed: true,
      },
    ];
    expect(component.completedTasks).toEqual(expectedTasks);
  });

  it('should not add task if name is empty', () => {
    component.addTask();
    expect(component.taskList).toEqual([]);
  });

  it('should not add a task if a task with the same name already exists in the list', () => {
    const pushSpy = jest.spyOn(component.taskList, 'push');
    const resetSpy = jest.spyOn(component.taskName, 'reset');
    component.taskList = mockTasks;
    component.taskName.setValue(mockTasks[1].name);

    component.addTask();

    expect(pushSpy).not.toHaveBeenCalled();
    expect(resetSpy).not.toHaveBeenCalled();
  });

  it('should add task', () => {
    component.taskName.setValue('New task');
    fixture.detectChanges();
    component.addTask();
    expect(component.taskList).toEqual([
      { name: 'New task', completed: false },
    ]);
  });
});
