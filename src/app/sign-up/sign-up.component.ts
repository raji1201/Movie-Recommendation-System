import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import {Http, Response, RequestOptions, Headers} from '@angular/http';
import { UserService } from '../user.service';
import { User } from './user';

@Component({
	selector: 'app-sign-up',
	templateUrl: './sign-up.component.html',
	styleUrls: ['./sign-up.component.css']
})

export class SignUpComponent {
	constructor(private http: Http, private router: Router, private userService: UserService) {}
	submitted = false;
	model = new User ('', '', '', '');

	onSubmit(form: NgForm) {
    let formData = form.value;
    const req = this.http.post('/signupuser', formData);
    req.subscribe(
    	res => {
        var response = res["_body"];
        var name = JSON.parse(response)['name'];
        if(name == "DUPLICATE")
          this.router.navigate(['/']);
        else
        {
          this.router.navigate(['/profile', name]);
          this.userService.setUserLoggedIn(name);
        }
      },
      err => {
        console.log("ERROR");
      }
    );  
  }
}