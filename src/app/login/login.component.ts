/**
 * File name : login.component.ts
 * @author Raji Sundararajan
 */
 
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { User } from './user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

/**
 * LoginComponent implements the login feature.
 */
export class LoginComponent{

  /**
   * Constructor provides Http, Router and UserService on object instantiation.
   * @constructor
   * @param {Http} http : For sending http requests.
   * @param {Router} router : For routing/redirecting to other components.
   * @param {UserService} userService : For maintaining the state of the user login.
   */
  constructor(private http: Http, private router: Router, private userService: UserService) {}
    
  /** Sets the default value to be false, until the sign up form is submitted. */
  submitted = false;
  /** Creates a new user on object initialisation with default blank strings of class User. */
  model = new User ('', '');

  /**
   * This function is called to submit login data.
   * @param {NgForm} form : Login In form data.
   */
  onSubmit(form: NgForm) {

    /** formData holds the data submitted by the user */
    let formData = form.value;

    const regexForEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(regexForEmail.test(formData.email))
    {  
      /** Http post request for login */
      const req = this.http.post('/loginuser', formData);

      /** Gets the Http response with the username of the logged in user. */
      req.subscribe(
      	res => {
          var response = res["_body"];
          var name = JSON.parse(response)['name'];

          /** Successful login returns username, else "ERROR". */
          if(name == "ERROR")
          {
            this.router.navigate(['/']);
          }
          else
          {
            /** Redirected to profile page on successful login, isUserLoggedIn set to true for that user. */
            this.router.navigate(['/profile', name]);
            this.userService.setUserLoggedIn(name);
          }
        },
        err => {
          console.log("ERROR");
        }
      );
    }
    else
      alert('Email should have \'@\' symbol');  
  }
}