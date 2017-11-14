import { browser, by, element } from 'protractor';

/**
 * This file has all the functions used during the e2e test.
 */
export class AppPage {
  	navigateTo(path = '/') {
  		browser.pause();
        browser.ignoreSynchronization = true;
    	return browser.get(path);
  	}

    /**
     * Adds a pause of 3 seconds.
     */
    pause()
    {
        browser.driver.sleep(3000);
    }

    /**
     * Returns the title of the page.
     */
	getTitle(){
        return browser.getTitle();
    }
        
    /**
     * Returns the login email element.
     */
    getLoginFormEmail(){
		return element(by.id('inputEmail'));               
    }

    /**
     * Returns the login password element.
     */
	getLoginFormPassword(){
		return element(by.id('inputPassword'));         
    }

    /**
     * Returns the login button element.
     */
    getLoginButton(){
        return element(by.id('loginBtn2'));
    }

    /**
     * Returns the sign up button element.
     */
    getSignup(){
        return element(by.css('.btn.btn-signin'));
    }

    /**
     * Returns the sign up name element.
     */
    getSignupFormName(){
        return element(by.id('name'));
    }

    /**
     * Returns the sign up email element.
     */
    getSignupFormEmail(){
        return element(by.id('inputEmail'));
    }

    /**
     * Returns the sign up password element.
     */
    getSignupFormPassword(){
        return element(by.id('inputPassword'));
    }

    /**
     * Returns the sign up verify password element.
     */
    getSignupFormConfirmPassword(){
        return element(by.id('inputConfirmPassword'));
    }

    /**
     * Returns the 'See More top rated movies' button element.
     */
    getSeeMoreBtn2()
    {
        return element(by.id('seemoreBtn2'));
    }

    /**
     * Returns the first top rated movie link element.
     */
    getTopRatedMovies()
    {
        return element(by.id('movie1'));
    }

    /**
     * Returns the watched button element.
     */
    getWatchedBtn()
    {
        return element(by.id('watchedBtn'));
    }

    /**
     * Returns the menu button element.
     */
    getMenuBtn()
    {
        return element(by.id('menuBtn'));
    }

    /**
     * Returns the ratings button element.
     */
    getRatingBtn()
    {
        return element(by.id('star5label'));
    }

    /**
     * Returns the profile button in menu element.
     */
    getProfileBtn()
    {
        return element(by.id('profileBtn'));
    }

    /**
     * Returns the logout button in menu element.
     */
    getLogoutBtn()
    {
        return element(by.id('logoutBtn'));
    }

    /**
     * Returns the sign up in menu button element.
     */
    getSignUpBtn()
    {
        return element(by.id('signupBtn'));
    }

    /**
     * Returns the login button in menu element.
     */
    getLoginBtn()
    {
        return element(by.id('loginBtn'));
    }

    /**
     * Returns the login button element.
     */
    getLoginBtn2()
    {
        return element(by.id('loginBtn2'));
    }

    /**
     * Returns the search bar input element.
     */
    getSearchBar()
    {
        return element(by.id('search'));
    }

    /**
     * Returns the search button element.
     */
    getSearchBtn()
    {
        return element(by.id('searchBtn'));
    }

    /**
     * Returns the top search result element.
     */
    getSearchMovie()
    {
        return element(by.id('smovie'));
    }
}
