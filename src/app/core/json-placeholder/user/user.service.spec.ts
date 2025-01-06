import { TestBed } from '@angular/core/testing';

import { HttpClientModule } from '@angular/common/http';
import { JsonPlaceholderUserService } from './user.service';

describe('JsonPlaceholderUserService', () => {
  let service: JsonPlaceholderUserService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
    });
    service = TestBed.inject(JsonPlaceholderUserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
