describe('auth', function () {

    beforeAll(function () {
        browser.get(browser.baseUrl + '/FrontEnd/public/#/auth');
        element(by.model('login.usuario')).sendKeys('misantropee@gmail.com');
        element(by.model('login.contrasena')).sendKeys('1234');
        element(by.id('login')).click();
    });

    it('redirects to profile after login', function () {
        expect(browser.getCurrentUrl()).toMatch(/\/#\/profileMain/);
    });

    it('should redirect to profile main if logged user forces main page URL', function () {
        browser.navigateTo = browser.baseUrl + '/FrontEnd/public/#/signin';
        expect(browser.getCurrentUrl()).toMatch(/\/#\/profileMain/);
    });

    it('redirects to profile after refresh', function () {
        browser.refresh();
        expect(browser.getCurrentUrl()).toMatch(/\/#\/profileMain/);
    });

    it('keeps user info after refresh', function () {
        browser.refresh();
        element.all(by.css('.datos_perfil')).evaluate('usuario')
            .then(function (value) {
                var user = value[0];
                expect(user.correo).toBe('misantropee@gmail.com');
            });
    });

    it('redirects to main after logout', function () {
        element(by.id('menu')).click();
        element(by.id('logout')).click().then(function () {
            browser.wait(function () {
                return browser.getCurrentUrl().then(function (url) {
                    console.log(url, url.match(/\/#\/signin/));
                    return url.match(/\/#\/signin/) != null;
                });
            }, 5000);
        });
    });
});