describe('side-bar', function () {

    beforeEach(module('gemStore'));

    beforeEach(module('templates/directives/side-bar.html'));

    var compile,
        rootScope,
        httpBackend,
        element,
        authService,
        API_CONFIG,
        auth;

    beforeEach(inject(function($compile, $rootScope, $injector, authenticationService) {
        compile = $compile;
        rootScope = $rootScope;
        API_CONFIG = $injector.get('API_CONFIG');
        httpBackend = $injector.get('$httpBackend');
        authService = authenticationService;
        auth= $injector.get('$auth');
    }));

    beforeEach(function() {
        httpBackend.whenGET('templates/signin/signin.html').respond(200, '');
        httpBackend.whenGET('templates/profile/profile-main.html').respond(200, '');

        element = compile("<side-bar></side-bar>")(rootScope);

        rootScope.$digest();

        setupLoginResponses(httpBackend, API_CONFIG);
    });

    beforeEach(function(){
        authService.reset();
    })

    it('has redirectToProfileMain method', function() {
        expect(rootScope.redirectToProfileMain).toBeDefined();
    });
    
    it('starts off as anonymous user', function() {
        expect(rootScope.isAuthenticated()).toBe(false);
    });

    it('detects authenticated user', function() {
        authService.login(CREDENTIALS);
        httpBackend.flush();        
        expect(rootScope.isAuthenticated()).toBe(true);
    });

    it('logs user out', function() {
        spyOn(auth, 'removeToken');
        authService.login(CREDENTIALS);
        httpBackend.flush();
        rootScope.logout();
        httpBackend.flush();
        expect(rootScope.isAuthenticated()).toBe(false);
        expect(auth.removeToken).toHaveBeenCalled();
    });

});
