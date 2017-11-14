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
   * @param {Http} http
   * @param {Router} router
   * @param {UserService} userService
   */
   constructor(private http: Http, private router: Router, private userService: UserService) {}
  
  onSubmit(form: NgForm) {
    /** formData holds the data submitted by the user */
    let formData = form.value;

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
}
