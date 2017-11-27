/**
 * File name : movieswatched.component.ts
 * @author Raji Sundararajan
 */

import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Http, Response, RequestOptions, Headers } from '@angular/http';

@Component({
  selector: 'app-movieswatched',
  templateUrl: './movieswatched.component.html',
  styleUrls: ['./movieswatched.component.css']
})

/**
 * MoviesWatchedComponent gives back all the movies watched by a particular user.
 */
export class MovieswatchedComponent implements OnInit {

  /** Stores the movies watched by the user. */
	public movies = [];
	/** stores the current user logged in */
	name = '';

	/**
   * Constructor provides Http and UserService on object instantiation.
   * @constructor
   * @param {Http} http
   * @param {UserService} userService
   */
	constructor(private userService: UserService, private http: Http) { }

	ngOnInit() {
		this.name = this.userService.getCurrUser();

		/** Http post request for movies watched by the user. */
		const req = this.http.post('/watchedmovies', {username:this.name});
		
    /** Gets the http response with the movie list as an array. */
    req.subscribe(
    	res => {
				var response = res["_body"];

		    /** Bind the movie details from the http response to local variables. */
        this.movies = JSON.parse(response)['movies'];
          
        if(this.movies.length == 0)
  			{
  			  this.movies = ['No results!'];
  			}
      }
    ); 	
  }
}
