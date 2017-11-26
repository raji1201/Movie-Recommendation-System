/**
 * File name : trm.component.ts
 * @author Raji Sundararajan
 */

import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import { Http, Response, RequestOptions, Headers } from '@angular/http';

@Component({
  selector: 'app-trm',
  templateUrl: './trm.component.html',
  styleUrls: ['./trm.component.css']
})

/**
 * TrmComponent implements the top rated movies feature.
 */
export class TrmComponent implements OnInit {

  /** Stores the 10 top rated movies. */
  public movies = [];

  /**
   * Constructor provides Http on object instantiation.
   * @constructor
   * @param {Http} http : For sending the http requests.
   */
  constructor(private http: Http) { }

  ngOnInit() {

    /**
     * On page intialization, an http get request is sent which gets the top rated movies.
     */
    const req = this.http.get('/seemore');

    /** Gets the http response with the movie details. */
    req.subscribe(
      res => {

        /** Bind the movie details from the http response to local variable. */
        var response = res["_body"];
        this.movies = JSON.parse(response)['movies'];
      },
      err => {
        console.log("ERROR");
      }
    );
  }
}