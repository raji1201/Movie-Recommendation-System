import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { User } from './user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent{

  constructor(private http: Http, private router: Router) {}
  submitted = false;
  model = new User ('', '');

  onSubmit(form: NgForm) {
    let formData = form.value;
    //console.log(formData);
    const req = this.http.post('/loginuser', formData);
    req.subscribe(
    	res => {
          var response = res["_body"];
          //console.log(JSON.parse(response)['name']);
          var name = JSON.parse(response)['name'];
          if(name == "ERROR")
            this.router.navigate(['/']);
          else
            this.router.navigate(['/profile', name]);
        },
        err => {
          console.log("ERROR");
        });  
  }
}
