import { Injectable } from '@angular/core';

/**
 * UserService helps in keeping track of the user's login and logout.
 */
@Injectable()
export class UserService {

  /** Maintains the login state of a user. */
  private isUserLoggedIn;

  /** Stores the username of the logged in user. */
  public username;

  /** Stores the movies watched by the current user. */
  public movies = [];
  
  /**
   * Sets user logged in to false on intialization
   * @constructor
   */
  constructor() { 
  	this.isUserLoggedIn = false;
  }

  /**
   * Sets user logged in to true and stores the name of the user logged in
   * @param {string} username
   */
  setUserLoggedIn(username) {
  	this.isUserLoggedIn = true;
    this.username = username;
  }

  /**
   * Gets the username of the user currently logged in
   * @return {string} username
   */
  getCurrUser()
  {
    return this.username;
  }

  /**
   * Returns true if the user is logged in currently, else false
   * @return {boolean} isUserLoggedIn
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
