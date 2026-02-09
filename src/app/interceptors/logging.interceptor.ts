import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements HttpInterceptor {
  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    console.log(`[HTTP] → ${request.method} ${request.url}`); // It logs every outgoing request and whether a response came back
    return next.handle(request).pipe(
      tap({
        next: () => console.log('[HTTP] Response received'),
        error: err => console.warn('[HTTP] Error:', err.status)
      })
    );
  }
}