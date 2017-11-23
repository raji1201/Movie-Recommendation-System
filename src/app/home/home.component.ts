import { Component, OnInit } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Router, RouterModule } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
/**
 * HomeComponent implements the homepage which displays the
 *  top recommmended movies.
 */
export class HomeComponent implements OnInit {
/** Stores the 1st top rated movie. */
  m1 = '';
/** Stores the 2nd top rated movie. */
  m2 = '';
/** Stores the 3rd top rated movie. */
  m3 = '';
/**
   * Constructor provides Http, Router and UserService on object instantiation.
   * @constructor
   * @param {Http} http
   * @param {Router} router
   * @param {UserService} userService
   */
  constructor(private http: Http, private router: Router, private userService: UserService) { }

  ngOnInit() {
    /** logs out the user */
    this.userService.logoutUser();
    /** Http post request for homepage to get the top movies on initialisation */
  	const req = this.http.get('/home');
    	req.subscribe(
    	res => {
          var response = res["_body"];
          /** Bind the movie details from the http response to local variables. */
          this.m1 = JSON.parse(response)['m1'];
          this.m2 = JSON.parse(response)['m2'];
          this.m3 = JSON.parse(response)['m3'];
        },
        err => {
          console.log("ERROR");
        });
  }
}
