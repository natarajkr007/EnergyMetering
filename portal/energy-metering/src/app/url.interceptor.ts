import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class UrlInterceptor implements HttpInterceptor {
  intercept (req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const absUrl: String = 'http://localhost:3000/api';
    if (req.url.indexOf('/login') === -1 && req.url.indexOf('/signup') === -1) {
      req = req.clone({
        url: absUrl + req.url,
        headers: req.headers.set('Content-Type', 'application/json')
                            .set('x-access-token', localStorage.getItem('token')),
      });
    } else {
      req = req.clone({
        url: absUrl + req.url,
        headers: req.headers.set('Content-Type', 'application/json'),
      });
    }
    console.log(req);
    return next.handle(req);
  }
}
