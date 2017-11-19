import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/map';

@Injectable()
export class DeviceDetailService {

  constructor(private httpClient: HttpClient) { }

  getDeviceDetail(req): Observable<any> {
    return this.httpClient.post('/device-detail', req).map(
      res => {
        const data = res;
        return data;
      },
      (err: HttpErrorResponse) => {
        if (err.error instanceof Error) {
          console.log('Client-side error occured.');
        } else {
          console.log('Server-side error occured.');
        }
      }
    );
  }

}
