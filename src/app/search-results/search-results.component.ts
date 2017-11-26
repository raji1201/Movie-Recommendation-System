/**
 * File name : search-results.component.ts
 * @author Raji Sundararajan
 */

import { Component, OnInit } from '@angular/core';
import { ElasticsearchService } from '../elasticsearch.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.css']
})

/**
 * SearchResultsComponent implements the search of movies list in the user's profile and returns 
 * the movies matching the query.
 */
export class SearchResultsComponent implements OnInit {

  /** Holds the moviesearch results. */
	public movies = [];

  /** Holds the searched term. */
  searchTerm = '';

  /**
   * Constructor provides ElasticsearchService and UserService on object instantiation.
   * @constructor
   * @param {ElasticsearchService} es
   * @param {UserService} userService
   */
  constructor(private userService: UserService, private es: ElasticsearchService) { }

  ngOnInit() {
  	
    this.searchTerm = this.userService.searchString;
    
    /** Checks if there are any results for the search. */
  	if(this.userService.movies.length != 0)
  	{
      /** Iterates through the result array and assigns the array to a local variable. */
  		for (let i = 0; i < this.userService.movies.length; i++)
  		{  	
        this.movies[i] = this.userService.movies[i];
      }
    }
    else
    	this.movies = ['No results!'];
  }
}
