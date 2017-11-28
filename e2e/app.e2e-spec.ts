/**
 * File name : app.e2e-spec.ts
 * @author Raji Sundararajan
 */

import { AppPage } from './app.po';

/**
 * E2E tests for testing the application using Selenium-Protractor.
 */
describe('Movie Recommendation App', () => {
  	let page: AppPage;

  	beforeEach(() => {
    	page = new AppPage();
  	});

    /**
     * Testing the home page title.
     */
	it('should display home page', () => {
    	page.navigateTo('/');    
    	expect(page.getTitle()).toEqual('Movie Recommendation Engine');
        page.pause();
        let movieBtn = page.getTopRatedMovies();
        movieBtn.click();
  	});

    /**
     * Testing the 'Top Rated Movies' feature.
     */
    it('should display top rated movie page', () => {
        page.pause();
    });

    /*
     * Navigating to the Sign up page.
     */
  
    it('should display signup page', () => {
        let menuBtn = page.getMenuBtn();
        menuBtn.click();
        page.pause();
        let signUpBtn = page.getSignUpBtn();
        signUpBtn.click();
        page.pause();
    });

    /*
     * Testing the Sign up feature.
     */
    
    it('should fill in the signup form', () => {
        let name = page.getSignupFormName();
        let email = page.getSignupFormEmail();
        let password = page.getSignupFormPassword();
        let confirmPassword = page.getSignupFormConfirmPassword();
        name.sendKeys('Smith');
        email.sendKeys('smith@gmail.com');
        password.sendKeys('smith');
        confirmPassword.sendKeys('smith');
        expect(name.getAttribute('value')).toEqual('Smith');
        expect(email.getAttribute('value')).toEqual('smith@gmail.com');
        expect(password.getAttribute('value')).toEqual('smith');
        expect(confirmPassword.getAttribute('value')).toEqual('smith');
        let btn = page.getSignup();
        btn.click();
        page.pause();
    });

    /**
     * Testing navigation to profile page on sign up.
     */
    it('should display profile page', () => {
        page.pause();
    });

    /**
     * Testing navigation to 'Top Rated Movies' page.
     */
    it('should display profile page', () => {
        page.pause();
        let btn = page.getSeeMoreBtn2();
        btn.click();
        page.pause();
    });

    /**
     * Testing navigation to top rated movie's review page.
     */
    it('should display top rated movies page', () => {
        let movieBtn = page.getTopRatedMovies();
        movieBtn.click();
        page.pause();
    });

    /**
     * Testing the movie review page.
     * Should show rating and watched button if logged in.
     */
    it('should display movie review page', () => {
        let watchedBtn = page.getWatchedBtn();
        watchedBtn.click();
        page.pause();
        let ratingBtn = page.getRatingBtn();
        ratingBtn.click();
        page.pause();
        let menuBtn = page.getMenuBtn();
        menuBtn.click();
        page.pause();
        let profileBtn = page.getProfileBtn();
        profileBtn.click();
        page.pause();
    });


    /**
     * Testing the logout feature.
     */
    it('should logout', () => {
        let menuBtn = page.getMenuBtn();
        menuBtn.click();
        page.pause();
        let logoutBtn = page.getLogoutBtn();
        logoutBtn.click();
    });

    /**
     * Testing the navigation to home page after logout.
     */
    it('should navigate to home page', () => {
        page.pause();
    });

    /**
     * Testing the navigation to the login page.
     */
    it('should display login page', () => {
        let menuBtn = page.getMenuBtn();
        menuBtn.click();
        page.pause();
        let loginBtn = page.getLoginBtn();
        loginBtn.click();
        page.pause();
    });

    /**
     * Testing the login feature.
     */
    it('should fill in the login form', () => {
        let email = page.getLoginFormEmail();
        let password = page.getLoginFormPassword();
        email.sendKeys('smith@gmail.com');
        password.sendKeys('smith');
        expect(email.getAttribute('value')).toEqual('smith@gmail.com');
        expect(password.getAttribute('value')).toEqual('smith');
        let btn = page.getLoginBtn2();
        btn.click();
    });

    /**
     * Testing navigation to profile page on login.
     */
    it('should display profile page', () => {
        page.pause();
    });

    /**
     * Testing navigation to recommended movies page.
     */
    it('should display profile page and then movie review page again', () => {

        let btn = page.getSeeMoreBtn1();
        btn.click();
        page.pause();
    });

    /**
     * Testing the search feature.
     */
    it('should search for a movie page', () => {
        let searchBar = page.getSearchBar();
        searchBar.sendKeys('Whiplash');
        let searchBtn = page.getSearchBtn();
        searchBtn.click();
        page.pause();

    });

    /**
     * Testing the navigation to the search results page.
     */
    it('should show movie search results page', () => {
        let searchedMovie = page.getSearchMovie();
        searchedMovie.click();
    });

    /**
     * Testing the navigation to movie review page on clicking on the searched movie results.
     */
    it('should display movie review page', () => {
        page.pause();
     });

    /**
     * Testing the movie review page.
     * Should show rating and watched button if logged in.
     * Change button from 'Add to Watch' to 'Watched'.
     */
    it('should display movie review page', () => {
        let watchedBtn = page.getWatchedBtn();
        watchedBtn.click();
        page.pause();
        let ratingBtn = page.getRatingBtn();
        ratingBtn.click();
        page.pause();
        let menuBtn = page.getMenuBtn();
        menuBtn.click();
        page.pause();
        let profileBtn = page.getProfileBtn();
        profileBtn.click();
        page.pause();
    });

    /**
     * Testing the watched movies feature.
     */
    it('should display watched movies page', () => {
        let watchedMovies = page.getWatchedMovieBtn();
        watchedMovies.click();
        page.pause();
        let watchedMovie = page.getWatchedMovie();
        watchedMovie.click();
        page.pause();
    });

    /**
     * Testing the logout feature.
     */
    it('should logout', () => {
        let menuBtn = page.getMenuBtn();
        menuBtn.click();
        page.pause();
        let logoutBtn = page.getLogoutBtn();
        logoutBtn.click();
    });
});
