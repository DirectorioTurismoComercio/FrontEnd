describe('Auth module', function () {

	var _isUserLoggedIn, _authService, $httpBackend;
	var API_CONFIG;
	var requestHandler;

	beforeEach(module('auth'));
	beforeEach(module('constants'));
	beforeEach(inject(function ($injector) {
		$httpBackend = $injector.get('$httpBackend');
		API_CONFIG = $injector.get('API_CONFIG');

        requestHandler = $httpBackend.when('POST', getLoginUrl())
        	.respond(LOGIN_API_RESPONSE);
        $httpBackend.when('GET', API_CONFIG.url + API_CONFIG.user)
        	.respond(USER_API_RESPONSE);

        _isUserLoggedIn = $injector.get('isUserLoggedIn');
        _authService = $injector.get('authenticationService'); 
    }));
    beforeEach(function(){
    	_authService.logout();
    });

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
		expect(user.name).toBe(USERNAME);
		expect(user.token).not.toBe(undefined);
	});

	it('receives credentials', function(){
		expect(_authService.login).toThrow();
	});

	it('receives password', function(){
		expect(function(){_authService.login({username:USERNAME})}).toThrow();
	});

	it('calls API login service with params', function(){
		$httpBackend.expectPOST(getLoginUrl(), CREDENTIALS);
		doLogin();
	});

	it('calls API user data service with token', function(){
		$httpBackend.expectGET(API_CONFIG.url + API_CONFIG.user, function(headers) {
	       return headers['Authorization'] == 'Token ' + TOKEN;
	    });
		doLogin();
		var user = _authService.getUser();
	});

	it('receives token from API', function(){
		doLogin();
		expect(_authService.getUser().token).toBe(TOKEN);
	});

	it('handles incorrect credentials', function(){
		var catchedError = false;
		requestHandler.respond(401, '');
		doLogin(function(){
			catchedError = true;
		});
		expect(catchedError).toBe(true);
	});

	it('retrieves user data', function(){
		doLogin();
		var user = _authService.getUser();
		expect(user.correo).toBe(USER_API_RESPONSE.correo);
	});

	function getLoginUrl(){
		return API_CONFIG.url + API_CONFIG.login;
	}

	function doLogin(catchFunction){
		var promise = _authService.login(CREDENTIALS);
		if(catchFunction != undefined)
			promise.catch(catchFunction);
		$httpBackend.flush();		
	}
});