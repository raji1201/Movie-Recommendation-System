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

  /** Stores the 1st top rated movie. */
  m1 = '';
  /** Stores the 2nd top rated movie. */
  m2 = '';
  /** Stores the 3rd top rated movie. */
  m3 = '';
  /** Stores the 4th top rated movie. */
  m4 = '';
  /** Stores the 5th top rated movie. */
  m5 = '';

  /**
   * Constructor provides Http on object instantiation.
   * @constructor
   * @param {Http} http
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
        var response = res["_body"];
        
        /** Bind the movie details from the http response to local variables. */
        this.m1 = JSON.parse(response)['m1'];
        this.m2 = JSON.parse(response)['m2'];
        this.m3 = JSON.parse(response)['m3'];
        this.m4 = JSON.parse(response)['m4'];
        this.m5 = JSON.parse(response)['m5'];
      },
      err => {
        console.log("ERROR");
      }
    );
  }
}