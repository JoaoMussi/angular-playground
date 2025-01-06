import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchComponent } from './search-users.component';
import { JsonPlaceholderUserService } from '../core/json-placeholder/user/user.service';
import { of } from 'rxjs';

const mockUserList = [{}];

describe('SearchComponent', () => {
  let component: SearchComponent;
  let fixture: ComponentFixture<SearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchComponent],
      providers: [
        {
          provide: JsonPlaceholderUserService,
          useValue: {
            getAll: () => of(mockUserList),
            post: () => of(mockUserList[0]),
            delete: () => of(),
            patch: () => of(),
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(SearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
