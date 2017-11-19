import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DeviceDetailService } from '../services/device-detail.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [DeviceDetailService]
})
export class HomeComponent implements OnInit {

  constructor(private deviceDetailService: DeviceDetailService, private router: Router) { }

  ngOnInit() {
    if (!localStorage.getItem('token') || !localStorage.getItem('user')) {
      this.router.navigate(['/login']);
    }

    const user = JSON.parse(localStorage.getItem('user'));

    const req = {
      devices: user.device.id
    };
    this.deviceDetailService.getDeviceDetail(req).subscribe(
      res => {
        console.log(res);
      }
    );
  }

}
