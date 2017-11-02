import { Component, OnInit } from '@angular/core';
import { LoginService } from '../services/login.service';

import { Login } from '../models/login';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public username;
  public password;

  constructor(private loginService: LoginService) { }

  ngOnInit() {
  }

  doLogin() {
    const req: Login = {
      username: this.username,
      password: this.password
    };
    this.loginService.doLogin(req).subscribe(
      res => {
        console.log(res);
      }
    );
  }

}
