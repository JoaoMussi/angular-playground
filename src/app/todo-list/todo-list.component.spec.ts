import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';

import { TodoListComponent } from './todo-list.component';
import { JsonPlaceholderTodoService } from '../core/json-placeholder/todo/todo.service';
import { HttpClientModule } from '@angular/common/http';
import { signal } from '@angular/core';
import { JsonPlaceholderTodo } from '../core/json-placeholder/todo/todo.model';
import { of } from 'rxjs';

const mockTodoList = [
  {
    userId: 1,
    id: 4,
    title: 'et porro tempora',
    completed: true,
  },
  {
    userId: 1,
    id: 8,
    title: 'quo adipisci enim quam ut ab',
    completed: true,
  },
  {
    userId: 1,
    id: 10,
    title: 'illo est ratione doloremque quia maiores aut',
    completed: true,
  },
];

describe('TodoListComponent', () => {
  let component: TodoListComponent;
  let fixture: ComponentFixture<TodoListComponent>;
  let service: JsonPlaceholderTodoService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TodoListComponent, HttpClientModule],
      providers: [
        {
          provide: JsonPlaceholderTodoService,
          useValue: {
            getAll: () => of(mockTodoList),
            post: () => of(mockTodoList[0]),
            delete: () => of(),
            patch: () => of(),
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(TodoListComponent);
    component = fixture.componentInstance;
    service = TestBed.inject(JsonPlaceholderTodoService);
    component.todoList = signal(mockTodoList);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should add todo', fakeAsync(() => {
    const expectedNewTodo = {
      userId: 1,
      id: 20,
      title: 'Task name',
      completed: false,
    };
    const postSpy = jest
      .spyOn(service, 'post')
      .mockReturnValueOnce(of(expectedNewTodo));

    component.addTodo('Task name');
    tick();

    expect(postSpy).toHaveBeenCalledWith({
      userId: 1,
      title: 'Task name',
      completed: false,
    });
    expect(component.todoList()).toEqual([expectedNewTodo, ...mockTodoList]);
  }));

  it('should get todo list by status', () => {
    expect(component.getTodoListByStatus(true)).toEqual(
      mockTodoList.filter((todo) => todo.completed === true)
    );
  });

  it('should delete todo', fakeAsync(() => {
    const deleteSpy = jest.spyOn(service, 'delete').mockReturnValueOnce(of(undefined));
    const updateSpy = jest.spyOn(component.todoList, 'update');

    component.deleteTodo(4);
    tick();
    tick();

    expect(deleteSpy).toHaveBeenCalledWith(4);
    expect(updateSpy).toHaveBeenCalled();
    expect(component.todoList()).toEqual(
      mockTodoList.filter((todo) => todo.id !== 4)
    );
  }));

  it('should toggle todo status', fakeAsync(() => {
    const patchSpy = jest.spyOn(service, 'patch').mockReturnValueOnce(
      of({
        userId: 1,
        id: 4,
        title: 'et porro tempora',
        completed: false,
      })
    );
    const updateSpy = jest.spyOn(component.todoList, 'update');

    const toggledTodo: JsonPlaceholderTodo = mockTodoList.find(
      (todo) => (todo.id = 4)
    )!;
    const expectedTodoList = mockTodoList.map((todo) =>
      todo.id === 4
        ? { ...toggledTodo, completed: !toggledTodo.completed }
        : todo
    );

    component.toggleTodo(4);
    tick();

    expect(patchSpy).toHaveBeenCalledWith(4, {
      completed: !toggledTodo.completed,
    });
    expect(updateSpy).toHaveBeenCalled();
    expect(component.todoList()).toEqual(expectedTodoList);
  }));
});
