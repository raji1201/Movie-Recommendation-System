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

	public movies = [];

  constructor(private userService: UserService, private es: ElasticsearchService) { }

  ngOnInit() {
  	
  	if(this.userService.movies.length != 0)
  	{
  		for (let i = 0; i < this.userService.movies.length; i++)
  		{  	 /** Assign the movie list from user profile to local variables. */
        this.movies[i] = this.userService.movies[i];
      }
    }
    else
    	this.movies = ['No results!'];
  }
}
