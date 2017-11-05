import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../services/login.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Login } from '../models/login';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [LoginService]
})
export class LoginComponent implements OnInit {
  loginForm;
  username: String;
  password: String;

  constructor(private loginService: LoginService, private formBuilder: FormBuilder, private router: Router) {
   }

  ngOnInit() {
    if (localStorage.getItem('token') && localStorage.getItem('user')) {
      this.router.navigate(['/home']);
    }

    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  doLogin() {
    this.username = this.loginForm.get('username').value;
    this.password = this.loginForm.get('password').value;
    const req: Login = {
      username: this.username,
      password: this.password
    };
    this.loginService.doLogin(req).subscribe(
      res => {
        // console.log(res);
        if (res.success) {
          localStorage.setItem('token', res.token);
          localStorage.setItem('user', JSON.stringify(res.user));
          this.router.navigate(['/home']);
        }
      }
    );
  }

}
