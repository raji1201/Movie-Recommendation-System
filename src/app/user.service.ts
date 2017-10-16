import { Injectable } from '@angular/core';

@Injectable()
export class UserService {

  private isUserLoggedIn;
  public username;

  constructor() { 
  	this.isUserLoggedIn = false;
  }

  setUserLoggedIn(username) {
  	this.isUserLoggedIn = true;
    this.username = username;
  }

  getUserLoggedIn() {
  	return this.isUserLoggedIn;
  }

}
