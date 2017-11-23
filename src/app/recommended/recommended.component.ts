import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Http } from '@angular/http';

@Component({
  selector: 'app-recommended',
  templateUrl: './recommended.component.html',
  styleUrls: ['./recommended.component.css']
})

/**
 * RecommendedComponent implements the recommended movies feature.
 */
export class RecommendedComponent implements OnInit {

	/** Stores the 10 top recommended movies for the currently logged in user. */
	public movies = [];
	name = '';

	/**
	 * Constructor provides Http on object instantiation.
	 * @constructor
	 * @param {Http} http
	 */
	constructor(private userService: UserService, private http: Http) { }

  	ngOnInit() {
	  	/**
	     * On page intialization, an http get request is sent which gets the top 3 recommended movies.
	     */
	    this.name = this.userService.getCurrUser();
	    const req = this.http.post('/recommended', {username:this.name});

	    /** Gets the http response with the movie details. */
	    req.subscribe(
	    	res => {

	    	    /** Bind the movie details from the http response to local variable. */
	        	var response = res["_body"];
	        	this.movies = JSON.parse(response)['movies'];
	        	
	        	if(this.movies.length == 0)
  				{
  			   		this.movies = ['No results!'];
  				}
  			else
	     	},
	      	err => {
	        	console.log("ERROR");
	      	}
	    );
	}
}