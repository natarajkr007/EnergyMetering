import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/map';

@Injectable()
export class LoginService {

  constructor(private httpClient: HttpClient) { }

  doLogin(req): Observable<any> {
    const url = 'http:localhost:3000/api/login';
    return this.httpClient.post(url, req).map(
      res => {
        const data = res;
        return data;
      }
    );
  }

}
