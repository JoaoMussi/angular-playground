import { CommonModule } from '@angular/common';
import {
  Component,
  OnDestroy,
  OnInit,
  signal,
  WritableSignal,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  BehaviorSubject,
  debounceTime,
  forkJoin,
  skip,
  Subject,
  take,
  takeUntil,
} from 'rxjs';
import { JsonPlaceholderUser } from '../core/json-placeholder/user/user.model';
import { JsonPlaceholderUserService } from '../core/json-placeholder/user/user.service';

@Component({
  selector: 'play-search-users',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './search-users.component.html',
  styleUrl: './search-users.component.scss',
})
export class SearchComponent implements OnInit, OnDestroy {
  searchTerm = new BehaviorSubject<string>('');
  users: WritableSignal<JsonPlaceholderUser[]> = signal([]);

  unsubscribe$ = new Subject<void>();

  constructor(private userService: JsonPlaceholderUserService) {}

  ngOnInit(): void {
    this.getAllUsers();
    this.listenToSearchTerm();
  }

  searchChanged(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.searchTerm.next(value);
  }

  private getAllUsers(): void {
    this.userService
      .getAll()
      .pipe(take(1))
      .subscribe((users: JsonPlaceholderUser[]) => {
        this.users.set(users);
      });
  }

  private listenToSearchTerm() {
    this.searchTerm
      .pipe(debounceTime(300), skip(1), takeUntil(this.unsubscribe$))
      .subscribe((searchTerm) => {
        if (searchTerm) {
          this.searchUsers(searchTerm);
        } else {
          this.getAllUsers();
        }
      });
  }

  private searchUsers(searchTerm: string) {
    forkJoin([
      this.userService.getByFilters({
        name: searchTerm,
      }),
      this.userService.getByFilters({
        username: searchTerm,
      }),
      this.userService.getByFilters({
        email: searchTerm,
      }),
    ])
      .pipe(take(1))
      .subscribe(
        (
          response: [
            JsonPlaceholderUser[],
            JsonPlaceholderUser[],
            JsonPlaceholderUser[]
          ]
        ) => {
          const mergedArrayWithoutDuplications: JsonPlaceholderUser[] = [
            ...new Set([...response[0], ...response[1], ...response[2]]),
          ];
          this.users.set(mergedArrayWithoutDuplications);
        }
      );
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
