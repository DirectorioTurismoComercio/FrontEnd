describe('edit profile', function () {
    beforeAll(function () {
        browser.get(browser.baseUrl + '/FrontEnd/public/#/auth');
        element(by.model('login.email')).sendKeys('misantropee@gmail.com');
        element(by.model('login.contrasena')).sendKeys('1234');
        element(by.id('login')).click();
    });

    it('redirects to edit profile page', function () {
    	element(by.id('editProfile')).click().then(function () {
            browser.wait(function () {
                return browser.getCurrentUrl().then(function (url) {
                    console.log(url, url.match(/\/#\/signin/));
                    return url.match(/\/#\/profileUpdate/) != null;
                });
            }, 5000);
        });
    });

    it('fills user data in fields', function () {
    	element(by.model('usuario.correo')).getAttribute('value').then(function(val) {
			expect(val).toBe('misantropee@gmail.com');
		});
    });

    it('keeps user info after refresh', function () {
        browser.refresh();
        element(by.model('usuario.correo')).getAttribute('value').then(function(val) {
			expect(val).toBe('misantropee@gmail.com');
		});
    });

    afterAll(function () {
        element(by.id('menu')).click();
        element(by.id('logout')).click();
    });
});