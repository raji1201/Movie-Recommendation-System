import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import {Http, Response, RequestOptions, Headers} from '@angular/http';

import { User } from './user';

@Component({
	selector: 'app-sign-up',
	templateUrl: './sign-up.component.html',
	styleUrls: ['./sign-up.component.css']
})

export class SignUpComponent {
	constructor(private http: Http, private router: Router) {}
	submitted = false;
	model = new User ('', '', '', '');

	onSubmit(form: NgForm) {
    let formData = form.value;
    //console.log(formData);
    const req = this.http.post('/signupuser', formData);
    req.subscribe(
    	res => {
          var response = res["_body"];
          //console.log(JSON.parse(response)['name']);
          var name = JSON.parse(response)['name'];
          this.router.navigate(['/profile', name]);
        },
        err => {
          console.log("ERROR");
        });  
  }
}