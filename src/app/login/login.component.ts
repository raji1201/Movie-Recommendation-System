import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {UserService} from '../user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private router:Router, private user:UserService) { }

  ngOnInit() {
  }

  loginUser(e) {
  	e.preventDefault();
  	console.log(e);
  	var email = e.target.elements[0].value;
  	var password = e.target.elements[1].value;
  	
  	if((email == 'admin@gmail.com' && password == 'admin') || (email == 'raji@gmail.com' && password == 'sund')) {
  		this.user.setUserLoggedIn(email);
  		this.router.navigate(['profile']);
  	}
  }
}
