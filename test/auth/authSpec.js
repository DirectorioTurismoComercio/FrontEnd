describe('Auth module', function () {

	var _isUserLoggedIn, _authService, $httpBackend;
	var credentials = {username:'myusername',password:'1234'};
	var API_CONFIG;

	beforeEach(module('auth'));
	beforeEach(module('constants'));
	beforeEach(inject(function ($injector) {
		$httpBackend = $injector.get('$httpBackend');
		API_CONFIG = $injector.get('API_CONFIG');

        authRequestHandler = $httpBackend.when('POST', getLoginUrl())
                            .respond({name: 'myusername'});
        _isUserLoggedIn = $injector.get('isUserLoggedIn');
        _authService = $injector.get('authenticationService'); 
    }));

	it('checks user is not logged in', function(){
		expect(_isUserLoggedIn()).toBe(false);
	});
	it('checks user is logged in', function(){
		_authService.login(credentials);
		expect(_isUserLoggedIn()).toBe(true);
	});
	it('stores username', function(){
		_authService.login(credentials);
		var user = _authService.getUser();
		expect(user.name).toBe('myusername');
	});
	it('receives credentials', function(){
		expect(_authService.login).toThrow();
	});
	it('receives password', function(){
		expect(function(){_authService.login({username:''})}).toThrow();
	});
	it('calls API login service', function(){
		$httpBackend.expectPOST(getLoginUrl());
		_authService.login(credentials);
		$httpBackend.flush();
	});

	function getLoginUrl(){
		return API_CONFIG.url + API_CONFIG.login;
	}
});