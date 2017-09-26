describe('Testing MORE App', function() {
    beforeAll(function() {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 999999;
    });

    it('should add a todo', function() {
    browser.get('http://localhost:4200/');
    browser.driver.sleep(5000);

    browser.driver.findElement(by.id('menuBtn')).click().then(function() {
    browser.driver.sleep(5000);
    if(!browser.driver.findElement(by.id('signupBtn')))
    {
        browser.close();
    }
    });

    browser.driver.findElement(by.id('signupBtn')).click().then(function() {
    browser.driver.sleep(5000);
    if(!browser.driver.findElement(by.id('signupBtn2')))
    {
        browser.close();
    }
    });

    browser.driver.findElement(by.id('signupBtn2')).click().then(function() {
    browser.driver.sleep(5000);
    });

    browser.driver.findElement(by.id('menuBtn')).click().then(function() {
    browser.driver.sleep(5000);
    if(!browser.driver.findElement(by.id('signupBtn')))
    {
        browser.close();
    }
    });

    browser.driver.findElement(by.id('loginBtn')).click().then(function() {
    browser.driver.sleep(5000);
    if(!browser.driver.findElement(by.id('loginBtn2')))
    {
        browser.close();
    }
    });    

    browser.driver.findElement(by.id('loginBtn2')).click().then(function() {
    browser.driver.sleep(5000);
    });

    browser.driver.findElement(by.id('titleBtn')).click().then(function() {
    browser.driver.sleep(5000);
    if(!browser.driver.findElement(by.id('seemoreBtn')))
    {
        browser.close();
    }
    });    
    
    });
});