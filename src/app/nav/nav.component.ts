import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params, RoutesRecognized } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  currUser = '';
  constructor(private route: ActivatedRoute, private router: Router, private userService: UserService) {

  }

  ngOnInit() {
  }

  isUserLoggedIn()
  {
    if(this.userService.getUserLoggedIn())
    {
      this.currUser = this.userService.getCurrUser();
      return true;
    }
    else
      return false;
  }
}
