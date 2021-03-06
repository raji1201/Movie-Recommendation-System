/**
 * File name : sign-up.component.ts
 * @author Raji Sundararajan
 */

import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import {Http, Response, RequestOptions, Headers} from '@angular/http';
import { UserService } from '../user.service';
import { User } from './user';
/** Gets the http response with the movie details. */
@Component({
	selector: 'app-sign-up',
	templateUrl: './sign-up.component.html',
	styleUrls: ['./sign-up.component.css']
})

/**
 * SignUpComponent implements the signup feature.
 */
export class SignUpComponent {
  
  /**
   * Constructor provides Http, Router and UserService on object instantiation.
   * @constructor
   * @param {Http} http
   * @param {Router} router
   * @param {UserService} userService
   */
	constructor(private http: Http, private router: Router, private userService: UserService) {}
  
  /** Sets the default value to be false, until the sign up form is submitted. */
  submitted = false;
  /** Creates a new user on object initialisation with default blank strings of class User. */
	model = new User ('', '', '', '');

  /**
   * This function is called to submit signup data.
   * @param {NgForm} form
   */
	onSubmit(form: NgForm) {
  
    let formData = form.value;
    let p1 = formData.password;
    let p2 = formData.verifyPassword;

    const regexForEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const regexForName = /^[A-z]+$/;

    if(regexForEmail.test(formData.email) && regexForName.test(formData.name) && p1 == p2)
    {  
      const req = this.http.post('/signupuser', formData);

      /** Gets the Http response and navigates to homepage if the user is already
       * registered else navigates to his profile page
       */
      req.subscribe(
      	res => {
          var response = res["_body"];
          console.log(response);
          var name = JSON.parse(response)['name'];
    
          if(name == "DUPLICATE")
          {
            alert('Email already exists!');
            this.router.navigate(['/']);
          }
          else
            /** Redirected to profile page on successful signup, setUserLoggedIn set to username for that user who signedup. */
            this.router.navigate(['/profile', name]);

          this.userService.setUserLoggedIn(name);
        },
        err => {
          console.log("ERROR");
        }
      );
    }
    else
      alert('Incorrect Email format and/or Name should contain only alphabets and/or Password and Verify Password do not match!');
  }
}