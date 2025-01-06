import { TestBed } from '@angular/core/testing';

import { JsonPlaceholderTodoService } from './todo.service';

describe('JsonPlaceholderTodoService', () => {
  let service: JsonPlaceholderTodoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JsonPlaceholderTodoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
