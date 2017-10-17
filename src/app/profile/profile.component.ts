import { Component, OnInit } from '@angular/core';
import {UserService} from '../user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

	name = '';
  constructor(private user: UserService) { }

  ngOnInit() {
  	this.name = this.user.username;
  }

}
