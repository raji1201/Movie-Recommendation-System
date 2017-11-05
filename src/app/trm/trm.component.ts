import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import { Http, Response, RequestOptions, Headers } from '@angular/http';

@Component({
  selector: 'app-trm',
  templateUrl: './trm.component.html',
  styleUrls: ['./trm.component.css']
})
export class TrmComponent implements OnInit {

  m1 = '';
  m2 = '';
  m3 = '';
  m4 = '';
  m5 = '';

  constructor(private http: Http) { }

  ngOnInit() {
  	const req = this.http.get('/seemore');
    	req.subscribe(
    	res => {

          var response = res["_body"];
          this.m1 = JSON.parse(response)['m1'];
          this.m2 = JSON.parse(response)['m2'];
          this.m3 = JSON.parse(response)['m3'];
          this.m4 = JSON.parse(response)['m4'];
          this.m5 = JSON.parse(response)['m5'];
        },
        err => {
          console.log("ERROR");
        });
  }

}
