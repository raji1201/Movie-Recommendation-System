import { Movie_Watch_Details } from './Movie_Watch_Details';
import { Component, OnInit } from '@angular/core';
// import {OnClickEvent, OnRatingChangeEven, OnHoverRatingChangeEvent} from 'angular-star-rating/src/star-rating-struct';
// import {StarRatingModule} from 'angular-star-rating/src/star-rating-module';

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
  rating=0.0;

  constructor(private http: Http,
    private router: Router,
     private activatedRoute: ActivatedRoute) { }
     ngOnInit() {
       
           this.activatedRoute.params.subscribe((params: Params) => {
             
             console.log(params['name']);
             this.name=params['name'];
             const req = this.http.get('/moviereview', params['name']);
           req.subscribe(
             res => {
               this.watched=params['watched'];
              this.name=params['name'];
                 var response = res["_body"];
                 //console.log(JSON.parse(response)['name']);
                 console.log(JSON.parse(response));
             });
           });
         }
  getWatchStatus(){
     

   
    
  }
  
  
//  watched_status='false';
update_rating(star:number){
  this.rating=star;
  const req = this.http.post('/rating',JSON.stringify(this.rating) );
  
    console.log(this.watched);
    req.subscribe(); 
  
  console.log(this.rating);
}
   watchStatus(){
    this.watched=!this.watched;
    const req = this.http.post('/watched',JSON.stringify(this.watched) );
    
      console.log(this.watched);
      req.subscribe(); 
   }
  
  // send_updates(movie_details_obj:Movie_Watch_Details){
    
   
   
  //  const headers = new Headers({'Content-Type': 'application/json'});
  // const req = this.http.post('/moviereview',JSON.stringify(movie_details_obj) );

  // console.log(this.watched);
  // req.subscribe(); 

  // }
}
