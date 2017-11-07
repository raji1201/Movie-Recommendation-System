import { browser, by, element } from 'protractor';

export class AppPage {
  	navigateTo(path = '/') {
  		browser.pause();
        browser.ignoreSynchronization = true;
    	return browser.get(path);
  	}

    getMovieReviewHead()
    {
        return element(by.id('head'));
    }

    pause()
    {
        browser.driver.sleep(3000);
    }

	getParagraphText() {
	  return element(by.css('app-root h1')).getText();
	}

  	getTitle(){
        return browser.getTitle();
    }

    getLogin(){
    	return element(by.id('loginBtn2'));
    }

    getLoginFormEmail(){
		return element(by.id('inputEmail'));               
    }

	getLoginFormPassword(){
		return element(by.id('inputPassword'));         
    }

    getLoginButton(){
        return element(by.id('loginBtn2'));
    }

    getSignup(){
        return element(by.css('.btn.btn-signin'));
    }

    getSignupFormName(){
        return element(by.id('name'));
    }

    getSignupFormEmail(){
        return element(by.id('inputEmail'));
    }

    getSignupFormPassword(){
        return element(by.id('inputPassword'));
    }

    getSignupFormConfirmPassword(){
        return element(by.id('inputConfirmPassword'));
    }

    getProfile()
    {
        return element(by.id('reco'));
    }

    getReview()
    {
        return element(by.id('movie1'));
    }
    
    getReviewPage()
    {
        return element(by.id('head'));
    }

    getProfileTitle()
    {
        return element(by.id('heading'));
    }
    
    getSeeMoreBtn2()
    {
        return element(by.id('seemoreBtn2'));
    }

    getTopRatedMovies()
    {
        return element(by.id('movie1'));
    }

    getWatchedBtn()
    {
        return element(by.id('watchedBtn'));
    }

    getMenuBtn()
    {
        return element(by.id('menuBtn'));
    }

    getRatingBtn()
    {
        return element(by.id('star5label'));
    }

    getProfileBtn()
    {
        return element(by.id('profileBtn'));
    }

    getLogoutBtn()
    {
        return element(by.id('logoutBtn'));
    }

    getSignUpBtn()
    {
        return element(by.id('signupBtn'));
    }

    getLoginBtn()
    {
        return element(by.id('loginBtn'));
    }

    getLoginBtn2()
    {
        return element(by.id('loginBtn2'));
    }

    getSearchBar()
    {
        return element(by.id('search'));
    }

    getSearchBtn()
    {
        return element(by.id('searchBtn'));
    }

    getSearchMovie()
    {
        return element(by.id('smovie'));
    }
}
