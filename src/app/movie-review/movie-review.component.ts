import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
//import {OnClickEvent, OnRatingChangeEven, OnHoverRatingChangeEvent} from '../../../../node_modules/angular-star-rating/src/star-rating-struct';
import {MatButtonModule} from '@angular/material';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import {HttpClientModule} from '@angular/common/http';

@Component({
  selector: 'app-movie-review',
  templateUrl: './movie-review.component.html',
  styleUrls: ['./movie-review.component.css']
})
export class MovieReviewComponent implements OnInit {
  watched=false;
  getWatchStatus(){
     

    return  this.http
      .get<JSON>('/data.json', {observe: 'response'})
      .subscribe(resp => {
      console.log(resp.headers.get('X-Custom-Header'));
       
        console.log(resp.body.watched);
      });
  }
  
  
//  watched_status='false';
  constructor(private router: Router,
               private http: Http) { }

  ngOnInit() {
  }
  watchStatus(){
    
   this.watched=!this.watched;
   const headers = new Headers({'Content-Type': 'application/json'});
  const req = this.http.post('/review',JSON.stringify(this.watched) );

  console.log(this.watched);
  req.subscribe(); 

  }
}
