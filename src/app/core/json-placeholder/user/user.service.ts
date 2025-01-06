import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseJsonPlaceholderService } from '../base-json-placeholder.service';
import { JsonPlaceholderUser, JsonPlaceholderUserFilters } from './user.model';

@Injectable({
  providedIn: 'root',
})
export class JsonPlaceholderUserService extends BaseJsonPlaceholderService<
  JsonPlaceholderUser,
  JsonPlaceholderUserFilters
> {
  constructor(override http: HttpClient) {
    super(http, '/users');
  }
}
