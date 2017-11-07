import { AppPage } from './app.po';

describe('Movie Recommendation App', () => {
  	let page: AppPage;

  	beforeEach(() => {
    	page = new AppPage();
  	});

	it('should display home page', () => {
    	page.navigateTo('/');    
    	expect(page.getTitle()).toEqual('Movie Recommendation Engine');
        page.pause();
        let movieBtn = page.getTopRatedMovies();
        movieBtn.click();
  	});

    
    it('should display movie review page', () => {
        //expect(page.getMovieReviewHead()).toBe(true);
        page.pause();
    });

    it('should display signup page', () => {
        let menuBtn = page.getMenuBtn();
        menuBtn.click();
        page.pause();
        let signUpBtn = page.getSignUpBtn();
        signUpBtn.click();
        page.pause();
    });

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


    it('should display profile page', () => {
        //expect(page.getProfileTitle()).toEqual('Welcome ABC!');
        let btn = page.getSeeMoreBtn2();
        btn.click();
        page.pause();
    });

    it('should display top rated movies page', () => {
        //expect(page.getTopRatedMovies()).toBe(true);
        let movieBtn = page.getTopRatedMovies();
        movieBtn.click();
        page.pause();
    });

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

    it('should display profile page and then movie review page again', () => {

        let btn = page.getSeeMoreBtn2();
        btn.click();
        page.pause();
        let movieBtn = page.getTopRatedMovies();
        movieBtn.click();
        page.pause();
    });

    it('should logout', () => {
        //expect(page.getProfileTitle()).toEqual('Welcome ABC!');
        let menuBtn = page.getMenuBtn();
        menuBtn.click();
        page.pause();
        let logoutBtn = page.getLogoutBtn();
        logoutBtn.click();
        page.pause();
    });

    it('should display login page', () => {
        let menuBtn = page.getMenuBtn();
        menuBtn.click();
        page.pause();
        let loginBtn = page.getLoginBtn();
        loginBtn.click();
        page.pause();
    });

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

    it('should display profile page', () => {
        //expect(page.getProfileTitle()).toEqual('Welcome ABC!');
        page.pause();
    });

    it('should search for a movie page', () => {
        //expect(page.getProfileTitle()).toEqual('Welcome ABC!');
        let searchBar = page.getSearchBar();
        searchBar.sendKeys('Jurassic');
        let searchBtn = page.getSearchBtn();
        searchBtn.click();
        page.pause();

    });

    it('should show movie search results page', () => {
        //expect(page.getProfileTitle()).toEqual('Welcome ABC!');
        let searchedMovie = page.getSearchMovie();
        searchedMovie.click();

    });

    it('should display movie review page', () => {
        //expect(page.getWatchedBtn()).toBe(true);
        page.pause();
    });

    it('should logout', () => {
        let menuBtn = page.getMenuBtn();
        menuBtn.click();
        page.pause();
        let logoutBtn = page.getLogoutBtn();
        logoutBtn.click();
    });
});
