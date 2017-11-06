import { Component, OnInit } from '@angular/core';
import { ElasticsearchService } from '../elasticsearch.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.css']
})
export class SearchResultsComponent implements OnInit {

	public movies = [];

  constructor(private userService: UserService, private es: ElasticsearchService) { }

  ngOnInit() {
  	
  	if(this.userService.movies.length != 0)
  	{
  		for (let i = 0; i < this.userService.movies.length; i++)
  		{
           this.movies[i] = this.userService.movies[i];
       	}
    }
    else
    	this.movies = ['No results!'];
  }
}
