import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { User } from './user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent{

  constructor(private http: Http) {}
  submitted = false;
  model = new User ('', '');

  onSubmit(form: NgForm) {
    let formData = JSON.stringify(form.value);
    console.log(formData);
    const req = this.http.post('/loginuser', formData);
    req.subscribe();  
  }
}
