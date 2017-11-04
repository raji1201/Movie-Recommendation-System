import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  	const req = this.http.post('/home', null);
    	req.subscribe(
    	res => {
          var response = res["_body"];
          console.log(JSON.parse(response));
          //console.log(JSON.parse(response)['name']);
          
        },
        err => {
          console.log("ERROR");
        });
  }

}
