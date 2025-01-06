import { TestBed } from '@angular/core/testing';

import { JsonPlaceholderUserService } from './user.service';

describe('JsonPlaceholderUserService', () => {
  let service: JsonPlaceholderUserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JsonPlaceholderUserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
