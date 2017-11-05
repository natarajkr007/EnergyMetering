import { Component, OnInit } from '@angular/core';
import { Router, Event, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.css']
})
export class TopbarComponent implements OnInit {
  loginPage: Boolean;
  registerPage: Boolean;

  constructor(private router: Router) {
    this.loginPage = true;
    this.registerPage = true;
  }

  ngOnInit() {
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        if (event.url.toString() !== '/login' || event.url.toString() !== '/register') {
          this.loginPage = false;
          this.registerPage = false;
        }
        if (event.url.toString() === '/login') {
          this.loginPage = true;
          this.registerPage = false;
        }
        if (event.url.toString() === '/register') {
          this.registerPage = true;
          this.loginPage = false;
        }
      }
    });
  }

}
