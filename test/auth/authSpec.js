describe('Auth module', function () {

	var _isUserLoggedIn, _authService, $httpBackend;
	var username = 'myusername';
	var token = 'aToK3NfR0MsErV3R';
	var credentials = {username:username,password:'1234'};
	var API_CONFIG;
	var requestHandler;

	beforeEach(module('auth'));
	beforeEach(module('constants'));
	beforeEach(inject(function ($injector) {
		$httpBackend = $injector.get('$httpBackend');
		API_CONFIG = $injector.get('API_CONFIG');

        requestHandler = $httpBackend.when('POST', getLoginUrl())
        	.respond({name: 'myusername', key: token});
        _isUserLoggedIn = $injector.get('isUserLoggedIn');
        _authService = $injector.get('authenticationService'); 
    }));

	it('checks user is not logged in', function(){
		expect(_isUserLoggedIn()).toBe(false);
	});
	it('checks user is logged in', function(){
		doLogin();
		expect(_isUserLoggedIn()).toBe(true);
	});
	it('stores username and token', function(){
		doLogin();
		var user = _authService.getUser();
		expect(user.name).toBe('myusername');
		expect(user.token).not.toBe(undefined);
	});
	it('receives credentials', function(){
		expect(_authService.login).toThrow();
	});
	it('receives password', function(){
		expect(function(){_authService.login({username:''})}).toThrow();
	});
	it('calls API login service with params', function(){
		$httpBackend.expectPOST(getLoginUrl(), credentials);
		doLogin();
	});
	it('receives token from API', function(){
		doLogin();
		expect(_authService.getUser().token).toBe(token);
	});
	it('handles incorrect credentials', function(){
		var catchedError = false;
		requestHandler.respond(401, '');
		doLogin(function(){
			catchedError = true;
		});
		expect(catchedError).toBe(true);
	});

	function getLoginUrl(){
		return API_CONFIG.url + API_CONFIG.login;
	}
	function doLogin(catchFunction){
		var promise = _authService.login(credentials);
		if(catchFunction != undefined)
			promise.catch(catchFunction);
		$httpBackend.flush();		
	}
});