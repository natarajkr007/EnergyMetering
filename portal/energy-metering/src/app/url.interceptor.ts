import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs/observable';

@Injectable()
export class UrlInterceptor implements HttpInterceptor {
  intercept (req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const absUrl: String = 'http://localhost:3000/api';
    req = req.clone({
      url: absUrl + req.url,
      headers: req.headers.set('Content-Type', 'application/json')
    });
    console.log(req);
    return next.handle(req);
  }
}
