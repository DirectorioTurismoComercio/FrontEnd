describe('Auth module', function () {

	var isUserLoggedIn, authService, httpBackend;
	var API_CONFIG;
	var requestHandler;

	beforeEach(module('auth'));
	beforeEach(module('constants'));
	beforeEach(inject(function ($injector) {
		httpBackend = $injector.get('$httpBackend');
		API_CONFIG = $injector.get('API_CONFIG');

        requestHandler = setupLoginResponses(httpBackend, API_CONFIG);

        isUserLoggedIn = $injector.get('isUserLoggedIn');
        authService = $injector.get('authenticationService'); 
    }));

    beforeEach(function(){
    	authService.logout();
    });

	it('checks user is not logged in', function(){
		expect(isUserLoggedIn()).toBe(false);
	});

	it('checks user is logged in', function(){
		doLogin();
		expect(isUserLoggedIn()).toBe(true);
	});

	it('stores username and token', function(){
		doLogin();
		var user = authService.getUser();
		expect(user.name).toBe(USERNAME);
		expect(user.token).not.toBe(undefined);
	});

	it('receives credentials', function(){
		expect(authService.login).toThrow();
	});

	it('receives password', function(){
		expect(function(){authService.login({username:USERNAME})}).toThrow();
	});

	it('calls API login service with params', function(){
		httpBackend.expectPOST(API_CONFIG.url + API_CONFIG.login, CREDENTIALS);
		doLogin();
	});

	it('calls API user data service with token', function(){
		httpBackend.expectGET(API_CONFIG.url + API_CONFIG.user, function(headers) {
	       return headers['Authorization'] == 'Token ' + TOKEN;
	    });
		doLogin();
	});

	it('calls API logout service with token', function(){
		doLogin();
		httpBackend.expectPOST(API_CONFIG.url + API_CONFIG.logout, {}, function(headers) {
			return headers['Authorization'] == 'Token ' + TOKEN;
	    });
		authService.logout();
		httpBackend.flush();
	});

	it('receives token from API', function(){
		doLogin();
		expect(authService.getUser().token).toBe(TOKEN);
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
		var user = authService.getUser();
		expect(user.correo).toBe(USER_API_RESPONSE.correo);
	});

	function doLogin(catchFunction){
		var promise = authService.login(CREDENTIALS);
		if(catchFunction != undefined)
			promise.catch(catchFunction);
		httpBackend.flush();		
	}
});