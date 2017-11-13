import { Injectable } from '@angular/core';

@Injectable()
export class UserService {

  private isUserLoggedIn;
  public username;
  public movies = [];
  
  /**
   * Sets user logged in to false on intialization
   */
  constructor() { 
  	this.isUserLoggedIn = false;
  }

  /**
   * Sets user logged in to true and stores the name of the user logged in
   */
  setUserLoggedIn(username) {
  	this.isUserLoggedIn = true;
    this.username = username;
  }

  /**
   * Gets the username of the user currently logged in
   */
  getCurrUser()
  {
    return this.username;
  }

  /**
   * Returns true if the user is logged in currently, else false
   */
  getUserLoggedIn() {
  	return this.isUserLoggedIn;
  }

  /**
   * Logs out current user
   */
  logoutUser()
  {
    this.isUserLoggedIn = false;    
  }
}
