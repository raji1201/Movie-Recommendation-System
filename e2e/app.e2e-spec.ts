import { AppPage } from './app.po';

describe('Movie Recommendation App', () => {
  	let page: AppPage;

  	beforeEach(() => {
    	page = new AppPage();
  	});

	it('should display home page', () => {
    	page.navigateTo('/');    
    	expect(page.getTitle()).toEqual('Movie Recommendation Engine');
  	});
  	

  	it('should display login page', () => {
        page.navigateTo('/login');
    });


    it('should fill in the login form', () => {
        page.navigateTo('/login');
        let email = page.getLoginFormEmail();
        let password = page.getLoginFormPassword();
        email.sendKeys('raji@gmail.com');
		password.sendKeys('raji');
    	expect(email.getAttribute('value')).toEqual('raji@gmail.com');
    	expect(password.getAttribute('value')).toEqual('raji');
        let btn = page.getLogin().click;
        //Check if redirected to profile
    });

    it('should display signup page', () => {
        page.navigateTo('/signup');
    });

    it('should fill in the signup form', () => {
        page.navigateTo('/signup');
        let name = page.getSignupFormName();
        let email = page.getSignupFormEmail();
        let password = page.getSignupFormPassword();
        let confirmPassword = page.getSignupFormConfirmPassword();
        name.sendKeys('Raji');
        email.sendKeys('raji@gmail.com');
		password.sendKeys('raji');
		confirmPassword.sendKeys('raji');
		expect(name.getAttribute('value')).toEqual('Raji');
    	expect(email.getAttribute('value')).toEqual('raji@gmail.com');
    	expect(password.getAttribute('value')).toEqual('raji');
    	expect(confirmPassword.getAttribute('value')).toEqual('raji');
        let btn = page.getSignup().click;
        //Check if redirected to profile
    });

    it('should display profile page', () => {
        page.navigateTo('/profile');
    });

    it('should display movie review page', () => {
        page.navigateTo('/profile');
        let movieBtn = page.getReview();
        movieBtn.click();
    });

    it('should display movie review page', () => {
        page.navigateTo('/reviews');
    });

});
