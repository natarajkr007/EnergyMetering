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
  devices: Object;

  constructor(private deviceDetailService: DeviceDetailService, private router: Router) { }

  ngOnInit() {
    if (!localStorage.getItem('token') || !localStorage.getItem('user')) {
      this.router.navigate(['/login']);
    }

    const user = JSON.parse(localStorage.getItem('user'));

    if (localStorage.getItem('devices')) {
      this.devices = JSON.parse(localStorage.getItem('devices'));
    } else {
      const req = {
        devices: user.device.id
      };
      this.deviceDetailService.getDeviceDetail(req).subscribe(
        res => {
          this.devices = res;
          localStorage.setItem('devices', JSON.stringify(res));
          window.location.reload();
        }
      );
    }
  }

  getReadings(device_id) {
    this.router.navigate(['/reading', device_id]);
  }

}
