import { Component, OnInit } from '@angular/core';
import { RegisterService } from '../services/register.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Register } from '../models/register';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [RegisterService]
})
export class RegisterComponent implements OnInit {
  registerForm;
  firstname: String;
  lastname: String;
  email: String;
  password: String;

  constructor(private registerService: RegisterService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      firstname: ['', Validators.required],
      lastname: [''],
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  doRegister() {
    this.firstname = this.registerForm.get('firstname').value;
    this.lastname = this.registerForm.get('lastname').value;
    this.email = this.registerForm.get('email').value;
    this.password = this.registerForm.get('password').value;
    const req: Register = {
      firstname: this.firstname,
      lastname: this.lastname,
      email: this.email,
      password: this.password
    };
    this.registerService.doRegister(req).subscribe(
      res => {
        console.log(res);
      }
    );
  }
}
