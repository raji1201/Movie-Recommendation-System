import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import { Http, Response, RequestOptions, Headers } from '@angular/http';

@Component({
  selector: 'app-trm',
  templateUrl: './trm.component.html',
  styleUrls: ['./trm.component.css']
})
export class TrmComponent implements OnInit {

  constructor(private http: Http) { }

  ngOnInit() {
  	const req = this.http.post('/seemore', null);
    	req.subscribe(
    	res => {

          var response = res["_body"];
          //var name = JSON.parse(response)['name'];
          console.log(response);
          
        },
        err => {
          console.log("ERROR");
        });
  }

}
