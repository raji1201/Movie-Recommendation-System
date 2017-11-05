import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Http, Response, RequestOptions, Headers } from '@angular/http';

@Component({
  selector: 'app-movie-review',
  templateUrl: './movie-review.component.html',
  styleUrls: ['./movie-review.component.css']
})
export class MovieReviewComponent implements OnInit {

	name  = '';

  constructor(private http: Http, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {

  	this.activatedRoute.params.subscribe((params: Params) => {
        	
        	console.log(params['name']);
        	this.name = params['name'];
        	const req = this.http.get('/moviereview', params['name']);
    		req.subscribe(
    			res => {
          		var response = res["_body"];
          		//console.log(JSON.parse(response)['name']);
          		console.log(JSON.parse(response));
        	});
      	});
  }  

}
