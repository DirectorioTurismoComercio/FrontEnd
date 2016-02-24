describe('Auth module', function () {

	var _isUserLoggedIn, _authService, $httpBackend;
	var username = 'myusername';
	var token = 'aToK3NfR0MsErV3R';
	var credentials = {username:username,password:'1234'};
	var userdata = {"id":50,"tags":[],"nombres":"Alex","apellido1":"Rico","apellido2":"Rico","numero_documento":null,"correo":"misantropee@gmail.com","nombre_institucion":"vivelab","telefono_institucion":"+573114598595","ubicacion_institucion":"Mosquera","direccion_institucion":"Cll 40 # 30 - 20","correo_institucion":null,"NIT":null,"descripcion":null,"municipio_id":11,"rol":3,"user":28,"redes":[]};
	var API_CONFIG;
	var requestHandler;

	beforeEach(module('auth'));
	beforeEach(module('constants'));
	beforeEach(inject(function ($injector) {
		$httpBackend = $injector.get('$httpBackend');
		API_CONFIG = $injector.get('API_CONFIG');

        requestHandler = $httpBackend.when('POST', getLoginUrl())
        	.respond({name: 'myusername', key: token});
        $httpBackend.when('GET', API_CONFIG.url + API_CONFIG.user)
        	.respond(userdata);

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

	it('calls API user data service with token', function(){
		$httpBackend.expectGET(API_CONFIG.url + API_CONFIG.user, function(headers) {
	       return headers['Authorization'] == 'Token ' + token;
	    });
		doLogin();
		var user = _authService.getUser();
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

	it('retrieves user data', function(){
		doLogin();
		var user = _authService.getUser();
		expect(user.correo).toBe(userdata.correo);
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