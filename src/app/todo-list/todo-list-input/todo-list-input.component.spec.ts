import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoListInputComponent } from './todo-list-input.component';

describe('TodoListInputComponent', () => {
  let component: TodoListInputComponent;
  let fixture: ComponentFixture<TodoListInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TodoListInputComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TodoListInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit taskName', () => {
    const emitSpy = jest.spyOn(component.addTask, 'emit');
    component.todoName = 'New task';
    component.addButtonClick();
    expect(emitSpy).toHaveBeenCalledWith('New task');
  });
});
