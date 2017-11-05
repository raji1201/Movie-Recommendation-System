import { Component, OnInit } from '@angular/core';
//import {OnClickEvent, OnRatingChangeEven, OnHoverRatingChangeEvent} from '../../../../node_modules/angular-star-rating/src/star-rating-struct';

import { Router, ActivatedRoute, Params } from '@angular/router';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import {MatButtonModule} from '@angular/material';
import {HttpClientModule} from '@angular/common/http';

@Component({
  selector: 'app-movie-review',
  templateUrl: './movie-review.component.html',
  styleUrls: ['./movie-review.component.css']
})
export class MovieReviewComponent implements OnInit {
  watched=false;
  name  = '';

  constructor(private http: Http,
    private router: Router,
     private activatedRoute: ActivatedRoute) { }
     ngOnInit() {
       
           this.activatedRoute.params.subscribe((params: Params) => {
             
             console.log(params['name']);
             
             const req = this.http.get('/moviereview', params['name']);
           req.subscribe(
             res => {
                 var response = res["_body"];
                 //console.log(JSON.parse(response)['name']);
                 console.log(JSON.parse(response));
             });
           });
         }
  getWatchStatus(){
     

    return  this.http
      .get<JSON>('/data.json', {observe: 'response'})
      .subscribe(resp => {
      console.log(resp.headers.get('X-Custom-Header'));
       
        console.log(resp.body.watched);
      });
  }
  
  
//  watched_status='false';

   
  
  watchStatus(){
    
   this.watched=!this.watched;
   const headers = new Headers({'Content-Type': 'application/json'});
  const req = this.http.post('/review',JSON.stringify(this.watched) );

  console.log(this.watched);
  req.subscribe(); 

  }
}
