describe('auth', function() {
	beforeAll(function(){
		browser.get('http://localhost/ecosistema/FrontEnd/public/#/auth');
		element(by.model('login.usuario')).sendKeys('misantropee@gmail.com');
		element(by.model('login.contrasena')).sendKeys('1234');
		element(by.id('login')).click();
	});

	it('redirects to profile after login', function() {
		expect(browser.getCurrentUrl()).toMatch(/\/#\/profileMain/);	
 	});

 	it('redirects to profile after refresh', function() {
 		browser.refresh();
		expect(browser.getCurrentUrl()).toMatch(/\/#\/profileMain/);	
 	});

 	it('keeps user info after refresh', function() {
 		browser.refresh();
		element.all(by.css('.datos_perfil')).evaluate('usuario')
			.then(function(value){
				var user = value[0];
				expect(user.correo).toBe('misantropee@gmail.com');
			});
 	});
});