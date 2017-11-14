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
        //expect(page.getMovieReviewHead()).toBe(true);
        page.pause();
    });

    /**
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

    /**
     * Testing the Sign up feature.
     */
    it('should fill in the signup form', () => {
        let name = page.getSignupFormName();
        let email = page.getSignupFormEmail();
        let password = page.getSignupFormPassword();
        let confirmPassword = page.getSignupFormConfirmPassword();
        name.sendKeys('Z');
        email.sendKeys('z@gmail.com');
		password.sendKeys('z');
		confirmPassword.sendKeys('z');
		expect(name.getAttribute('value')).toEqual('Z');
        expect(email.getAttribute('value')).toEqual('z@gmail.com');
        expect(password.getAttribute('value')).toEqual('z');
        expect(confirmPassword.getAttribute('value')).toEqual('z');
        let btn = page.getSignup();
        btn.click();
        page.pause();
    });

    /**
     * Testing navigation to profile page on sign up.
     */
    it('should display profile page', () => {
        //expect(page.getProfileTitle()).toEqual('Welcome ABC!');
        let btn = page.getSeeMoreBtn2();
        btn.click();
        page.pause();
    });

    /**
     * Testing navigation to 'Top Rated Movies' page.
     */
    it('should display top rated movies page', () => {
        //expect(page.getTopRatedMovies()).toBe(true);
        let movieBtn = page.getTopRatedMovies();
        movieBtn.click();
        page.pause();
    });

    /**
     * Testing the movie review page.
     * Should show rating and watched button if logged in.
     */
    it('should display movie review page', () => {
        //expect(page.getWatchedBtn()).toBe(true);
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
     * Testing navigation to profile page and back to movie review page.
     * Watched button should now display 'Watched'.
     */
    it('should display profile page and then movie review page again', () => {

        let btn = page.getSeeMoreBtn2();
        btn.click();
        page.pause();
        let movieBtn = page.getTopRatedMovies();
        movieBtn.click();
        page.pause();
    });

    /**
     * Testing the logout feature.
     */
    it('should logout', () => {
        //expect(page.getProfileTitle()).toEqual('Welcome ABC!');
        let menuBtn = page.getMenuBtn();
        menuBtn.click();
        page.pause();
        let logoutBtn = page.getLogoutBtn();
        logoutBtn.click();
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
     * Testign the login feature.
     */
    it('should fill in the login form', () => {
        let email = page.getLoginFormEmail();
        let password = page.getLoginFormPassword();
        email.sendKeys('z@gmail.com');
        password.sendKeys('z');
        expect(email.getAttribute('value')).toEqual('z@gmail.com');
        expect(password.getAttribute('value')).toEqual('z');
        let btn = page.getLoginBtn2();
        btn.click();
    });

    /**
     * Testing navigation to profile page on login.
     */
    it('should display profile page', () => {
        //expect(page.getProfileTitle()).toEqual('Welcome ABC!');
        page.pause();
    });

    /**
     * Testing the search feature.
     */
    it('should search for a movie page', () => {
        //expect(page.getProfileTitle()).toEqual('Welcome ABC!');
        let searchBar = page.getSearchBar();
        searchBar.sendKeys('Jurassic');
        let searchBtn = page.getSearchBtn();
        searchBtn.click();
        page.pause();

    });

    /**
     * Testing the navigation to the search results page.
     */
    it('should show movie search results page', () => {
        //expect(page.getProfileTitle()).toEqual('Welcome ABC!');
        let searchedMovie = page.getSearchMovie();
        searchedMovie.click();

    });

    /**
     * Testing the navigation to movie review page on clicking on the searched movie results.
     */
    it('should display movie review page', () => {
        //expect(page.getWatchedBtn()).toBe(true);
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
