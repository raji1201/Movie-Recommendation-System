/**
 * File name : profile.component.ts
 * @author Raji Sundararajan
 */

import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
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

  /** Stores the name of the 1st recommeded movie. */
  r1 = '';
  /** Stores the name of the 2nd recommeded movie. */
  r2 = '';
  /** Stores the name of the 3rd recommeded movie. */
  r3 = '';

  /**
   * Constructor provides Http and ActivatedRoute on object instantiation.
   * @constructor
   * @param {Http} http
   * @param {ActivatedRoute} activatedRoute
   */
  constructor(private http: Http, private activatedRoute: ActivatedRoute, private userService: UserService) {}

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

    /**
    * On page intialization, an http get request is sent which gets the top 3 recommeded movies.
    */
    this.name = this.userService.getCurrUser();
    const req1 = this.http.post('/reco', {username:this.name});

    /** Gets the http response with the top 3 recommended names. */  
    req1.subscribe(
      res => {
      var response = res["_body"];
        /** Bind the movie names from the http response to local variables. */
        this.r1 = JSON.parse(response)['r1'];
        this.r2 = JSON.parse(response)['r2'];
        this.r3 = JSON.parse(response)['r3'];
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