import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import { Http, Response, RequestOptions, Headers } from '@angular/http';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})

/**
 * ProfileComponent implements the user profile feature.
 */
export class ProfileComponent implements OnInit {

  /** Stores the username of the logged in user. */
  name = '';
  /** Stores the name of the 1st top rated movie. */
	m1 = '';
  /** Stores the name of the 2nd top rated movie. */
	m2 = '';
  /** Stores the name of the 3rd top rated movie. */
	m3 = '';

  /**
   * Constructor provides Http and ActivatedRoute on object instantiation.
   * @constructor
   * @param {Http} http
   * @param {ActivatedRoute} activatedRoute
   */
  constructor(private http: Http, private activatedRoute: ActivatedRoute) {}

 	ngOnInit() {

    /**
    * On page intialization, an http get request is sent which gets the top 3 rated movies.
    */
 		const req = this.http.get('/home');

    /** Gets the http response with the top 3 movie names. */  
   	req.subscribe(
     	res => {
        var response = res["_body"];
        /** Bind the movie names from the http response to local variables. */
        this.m1 = JSON.parse(response)['m1'];
        this.m2 = JSON.parse(response)['m2'];
        this.m3 = JSON.parse(response)['m3'];
      },
      err => {
        console.log("ERROR");
      }
    );

    /** Gets the username of the user currently logged in to display on profile page. */
  	this.activatedRoute.params.subscribe((params: Params) => {
     	this.name = params['name'];
    });
  };
}