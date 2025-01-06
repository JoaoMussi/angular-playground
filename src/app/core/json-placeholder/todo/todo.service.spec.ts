import { TestBed } from '@angular/core/testing';

import { JsonPlaceholderTodoService } from './todo.service';
import { HttpClientModule } from '@angular/common/http';

describe('JsonPlaceholderTodoService', () => {
  let service: JsonPlaceholderTodoService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
    });
    service = TestBed.inject(JsonPlaceholderTodoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
