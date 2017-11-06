import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { UserService } from '../user.service';

@Component({
  selector: 'app-movie-review',
  templateUrl: './movie-review.component.html',
  styleUrls: ['./movie-review.component.css']
})
export class MovieReviewComponent implements OnInit {

  currUser = '';
	name  = '';
  rating = '';
  users = '';
  length = '';
  rel = '';
  des = '';
  watchStatus = 'Add to watched list'
  constructor(private http: Http, private router: Router, private activatedRoute: ActivatedRoute, private userService: UserService) { }

  ngOnInit() {

  	this.activatedRoute.params.subscribe((params: Params) => {
        	
        	this.name = params['name'];
          const req = this.http.post('/moviereview', {movie:this.name});
    		req.subscribe(
    			res => {
          		var response = res["_body"];
          		this.name = JSON.parse(response)['name'];
              this.rating = JSON.parse(response)['rating'];
              this.users = JSON.parse(response)['users'];
              this.length = JSON.parse(response)['length'];
              this.rel = JSON.parse(response)['rel'];
              this.des = JSON.parse(response)['des'];
        	});
      	});

    console.log(this.userService.getUserLoggedIn());
    if(this.userService.getUserLoggedIn())
    {
    	console.log(this.name);
    	console.log(this.userService.getCurrUser());
      const req = this.http.post('/checkWatched', {movie:this.name, username:this.userService.getCurrUser()});
      req.subscribe(
      res => {
          var response = res["_body"];
          if(JSON.parse(response)['watch'])
            this.watchStatus = 'Watched';
          else
            this.watchStatus = 'Add to watched list'
        });
    }

  }

  isUserLoggedIn()
  {
    if(this.userService.getUserLoggedIn())
    {
      this.currUser = this.userService.getCurrUser();
      return true;
    }
    else
      return false;
  } 

  watched()
  {
    const req = this.http.post('/watched', {movie:this.name, username:this.userService.getCurrUser});
    req.subscribe(
      res => {
        this.watchStatus = 'Watched';
        });
  } 

  updateRating(n)
  {
    const req = this.http.post('/updateRating', {movie:this.name, username:this.userService.getCurrUser, rating:n});
    req.subscribe(
      res => {
        var response = res["_body"];
        this.rating = JSON.parse(response)['rating'];
        this.users = JSON.parse(response)['users'];
        });
  }
}
