import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskListColumnComponent } from './task-list-column.component';

describe('TaskListColumnComponent', () => {
  let component: TaskListColumnComponent;
  let fixture: ComponentFixture<TaskListColumnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskListColumnComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TaskListColumnComponent);
    component = fixture.componentInstance;
    component.name = 'Column name';
    component.taskList = [{ name: 'A task', completed: false }];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should toggle task status', () => {
    const expectedTaskList = [component.taskList[0]];
    expectedTaskList[0].completed = true;

    component.toggleTask(component.taskList[0]);

    expect(component.taskList).toEqual(expectedTaskList);
  });
});
