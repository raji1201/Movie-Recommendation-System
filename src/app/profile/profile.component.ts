import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import { Http, Response, RequestOptions, Headers } from '@angular/http';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

	name = '';
	m1 = '';
	m2 = '';
	m3 = '';

  	constructor(private http: Http, private activatedRoute: ActivatedRoute) {
  	}

  	ngOnInit() {

  		const req = this.http.post('/home', null);
    	req.subscribe(
    	/*res => {
          var response = res["_body"];
          //console.log(JSON.parse(response)['name']);
          
        },
        err => {
          console.log("ERROR");
        }*/);

  		this.activatedRoute.params.subscribe((params: Params) => {
        	this.name = params['name'];
        	console.log(params);
      	});
  	};
}
