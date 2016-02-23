describe('auth', function() {
	beforeAll(function(){
		browser.get('http://localhost/ecosistema/FrontEnd/public/#/auth');
		element(by.model('login.usuario')).sendKeys('misantropee@gmail.com');
		element(by.model('login.contrasena')).sendKeys('1234');
		element(by.id('login')).click();
	});

	it('should redirect to profile after login', function() {
		expect(browser.getCurrentUrl()).toMatch(/\/#\/profileMain/);	
 	});

 	it('should redirect to profile after refresh', function() {
 		browser.refresh();
		expect(browser.getCurrentUrl()).toMatch(/\/#\/profileMain/);	
 	});
});