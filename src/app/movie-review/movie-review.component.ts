import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { UserService } from '../user.service';

@Component({
  selector: 'app-movie-review',
  templateUrl: './movie-review.component.html',
  styleUrls: ['./movie-review.component.css']
})

/**
 * MovieReviewComponent implements the movie review feature.
 */
export class MovieReviewComponent implements OnInit {


  /** Stores the username of the logged in user. */
  currUser = '';
  /** Stores the genres of the movie. */
  genres = '';
  /** Stores the name of the movie production house. */
  production = [];
  /** Stores the budget of the movie. */
  budget = '';
  /** Stores the movie website. */
  website = '';
  /** Stores the tagline of the movie. */
  tag = '';
  /** Stores the name of the movie. */
  name  = '';
  /** Stores the rating of the movie. */
  rating = '';
  /** Stores the number of users who rated the movie. */
  users = '';
  /** Stores the length of the movie. */
  run = '';
  /** Stores the release year of the movie. */
  rel = '';
  /** Stores the movie description. */
  des = '';
  /** Stores the watched status of the movie by the current user. */
  watchStatus = 'Add to watched list'

  /**
   * Constructor provides Http, Router, ActivatedRoute and UserService on object instantiation.
   * @constructor
   * @param {Http} http
   * @param {Router} router
   * @param {UserService} userService
   * @param {ActivatedRoute} activatedRoute
   */
  constructor(private http: Http, private router: Router, private activatedRoute: ActivatedRoute, private userService: UserService) { }

  ngOnInit() {

    /**
     * On page intialization, an http request is sent which gets the movie info.
     */
  	this.activatedRoute.params.subscribe((params: Params) => {
      
      this.name = params['name'];

      /** Http post request for that particular movie. */
      const req = this.http.post('/moviereview', {movie:this.name});

      /** Gets the http response with the movie details. */
    	req.subscribe(
  			res => {
        	var response = res["_body"];
          
          /** Bind the movie details from the http response to local variables. */
        	this.name = JSON.parse(response)['title'];
          this.genres = JSON.parse(response)['genres'];
          this.budget = JSON.parse(response)['budget'];
          this.website = JSON.parse(response)['site'];
          this.run = JSON.parse(response)['run'];
          this.rel = JSON.parse(response)['rel'];
          this.des = JSON.parse(response)['des'];
          this.tag = JSON.parse(response)['tag'];
          this.production = JSON.parse(response)['production'];
          this.rating = JSON.parse(response)['rating'];
          this.users = JSON.parse(response)['user'];    
      	}
      );
    });

    /**
     * On page intialization, an http request is sent which checks if the current user has watched that particular movie.
     */
    if(this.userService.getUserLoggedIn())
    {
      /** Http post request for that particular movie and the current user. */
      const req = this.http.post('/checkWatched', {movie:this.name, username:this.userService.getCurrUser()});
      
      /** Gets the http response with the watched status. */
      req.subscribe(
      res => {
          var response = res["_body"];

          /** If the user has watched the movie, 'Watched' is displayed. Else, 'Add to watch list' is displayed. */
          if(JSON.parse(response)['watch'])
            this.watchStatus = 'Watched';
          else
            this.watchStatus = 'Add to watched list'
        });
    }

  }

  /**
   * On page intialization, getCurrUser function of UserService is called to check if a user is logged in.
   * @return {boolean}
   */
  isUserLoggedIn()
  {
    /** If the user is logged in, return true. Else, return false. */
    if(this.userService.getUserLoggedIn())
    {
      this.currUser = this.userService.getCurrUser();
      return true;
    }
    else
      return false;
  } 

  /**
   * Function to change the movie to watched movies.
   */
  watched()
  {
    /** Http post request with movie name and the username of the user currently logged in. */
    const req = this.http.post('/watched', {movie:this.name, username:this.userService.getCurrUser()});

    /** Gets the http response. */
    req.subscribe(
      res => {
        /** Changed the watched status of the movie to 'Watched'. */
        this.watchStatus = 'Watched';
        });
  } 

  /**
   * Function to update the movie rating.
   * @param {integer} n
   */
  updateRating(n)
  {
    /** Http post request with movie name, username of the user currently logged in and the rating given. */
    const req = this.http.post('/updateRating', {movie:this.name, username:this.userService.getCurrUser(), rating:n});
    
    /** Gets the http response with updated ratings and updated number of users who have rated that movie. */
    req.subscribe(
      res => {
        var response = res["_body"];
        /** Bind the movie data from the http response to local variables. */
        this.rating = JSON.parse(response)['rating'];
        this.users = JSON.parse(response)['users'];
        });
  }
}
