import { Injectable } from '@angular/core';

@Injectable()
export class UserService {

  private isUserLoggedIn;
  public username;
  public movies = [];
  
  constructor() { 
  	this.isUserLoggedIn = false;
  }

  setUserLoggedIn(username) {
  	this.isUserLoggedIn = true;
    this.username = username;
  }

  getCurrUser()
  {
    return this.username;
  }

  getUserLoggedIn() {
  	return this.isUserLoggedIn;
  }

  logoutUser()
  {
    this.isUserLoggedIn = false;    
  }
}
