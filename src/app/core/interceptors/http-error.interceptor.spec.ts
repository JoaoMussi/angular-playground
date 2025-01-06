import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import {
  HttpClient,
  HttpErrorResponse,
  HTTP_INTERCEPTORS,
} from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { HttpErrorInterceptor } from './http-error.interceptor';

describe('ErrorInterceptor', () => {
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        {
          provide: HTTP_INTERCEPTORS,
          useClass: HttpErrorInterceptor,
          multi: true,
        },
      ],
    });

    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should handle errors', () => {
    const errorMessage = 'Internal Server Error';

    httpClient.get('/test-url').subscribe({
      next: () => fail('Expected error, but request succeeded'),
      error: (error: HttpErrorResponse) => {
        expect(error.status).toBe(500);
        expect(error.error).toBe(errorMessage);
      },
    });

    const req = httpTestingController.expectOne('/test-url');
    req.flush(errorMessage, { status: 500, statusText: 'Server Error' });
  });

  it('should pass through successful requests', () => {
    const mockResponse = { data: 'success' };

    httpClient.get('/test-url').subscribe((response) => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpTestingController.expectOne('/test-url');
    req.flush(mockResponse);
  });
});
