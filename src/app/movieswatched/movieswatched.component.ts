import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import {Router, ActivatedRoute, Params} from '@angular/router';
import { Http, Response, RequestOptions, Headers } from '@angular/http';

@Component({
  selector: 'app-movieswatched',
  templateUrl: './movieswatched.component.html',
  styleUrls: ['./movieswatched.component.css']
})
export class MovieswatchedComponent implements OnInit {

	public movies = [];
	name = '';

	constructor(private userService: UserService, private http: Http) { }

	ngOnInit() {
		this.name = this.userService.getCurrUser();
		const req = this.http.post('/watchedmovies', {username:this.name});
    	req.subscribe(
    	res => {

        	var response = res["_body"];
          	this.movies = JSON.parse(response)['movies'];
          
          	if(this.movies.length == 0)
  			{
  			   	this.movies = ['No results!'];
  			}
  			else
  				this.movies = JSON.parse(response)['movies'];
        }); 	
  	}
}
