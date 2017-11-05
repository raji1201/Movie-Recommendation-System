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
  rating = '';
  users = '';
  length = '';
  rel = '';
  des = '';

  constructor(private http: Http, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {

  	this.activatedRoute.params.subscribe((params: Params) => {
        	
        	console.log(params['name']);
        	this.name = params['name'];
        	const req = this.http.post('/moviereview', params['name']);
    		req.subscribe(
    			res => {
          		var response = res["_body"];
              this.name = JSON.parse(response)['name'];
              this.rating = JSON.parse(response)['rating'];
              this.users = JSON.parse(response)['users'];
              this.length = JSON.parse(response)['length'];
              this.rel = JSON.parse(response)['rel'];
              this.des = JSON.parse(response)['des'];
              console.log(JSON.parse(response));
        	});
      	});
  }  

}
