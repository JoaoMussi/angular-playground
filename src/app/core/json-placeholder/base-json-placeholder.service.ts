import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JsonPlaceholderEntity } from './json-placeholder.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export abstract class BaseJsonPlaceholderService<
  T,
  EntityFilters extends Record<string, | string
      | number
      | boolean
      | readonly (string | number | boolean)[]>
> {
  protected apiUrl = 'https://jsonplaceholder.typicode.com';

  constructor(protected http: HttpClient, entityApiUrl: string) {
    this.apiUrl = this.apiUrl + entityApiUrl;
  }

  getAll(): Observable<T[]> {
    return this.http.get<T[]>(`${this.apiUrl}`);
  }

  get(id: number): Observable<T> {
    return this.http.get<T>(`${this.apiUrl}/${id}`);
  }

  getNested(id: number, nestedEntity: JsonPlaceholderEntity): Observable<T[]> {
    return this.http.get<T[]>(`${this.apiUrl}/${id}/${nestedEntity}`);
  }

  getByFilters(filters: EntityFilters): Observable<T[]> {
    return this.http.get<T[]>(`${this.apiUrl}`, { params: filters });
  }

  post(body: T): Observable<T> {
    return this.http.post<T>(`${this.apiUrl}`, body);
  }

  put(id: number, body: T): Observable<T> {
    return this.http.put<T>(`${this.apiUrl}/${id}`, body);
  }

  patch(id: number, body: Partial<T>): Observable<T> {
    return this.http.patch<T>(`${this.apiUrl}/${id}`, body);
  }

  delete(id: number): Observable<T> {
    return this.http.delete<T>(`${this.apiUrl}/${id}`);
  }
}
