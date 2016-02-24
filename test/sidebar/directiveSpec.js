describe('side-bar', function () {

    beforeEach(module('userModule'));
    beforeEach(module('gemStore'));

    beforeEach(module('templates/directives/side-bar.html'));

    var compile,
        rootScope,
        mockRoute,
        httpBackend,
        element,
        mockAutenticacionService,
        mockLocation,
        authService,
        API_CONFIG;

    beforeEach(inject(function($compile, $rootScope, $injector, $route, $location, autenticacionService, authenticationService) {
        compile = $compile;
        rootScope = $rootScope;
        mockRoute= $route;
        API_CONFIG = $injector.get('API_CONFIG');
        mockAutenticacionService = autenticacionService;
        authService = authenticationService;
        mockLocation= $location;
        httpBackend = $injector.get('$httpBackend');
        authService = authenticationService;
    }));

    beforeEach(function() {
        spyOn(mockAutenticacionService, 'isOnProfileMainMenu').and.callFake(function () {
            return true;
        });

        httpBackend.whenGET('templates/signin/signin.html').respond(200, '');

        element = compile("<side-bar></side-bar>")(rootScope);

        rootScope.$digest();

        setupLoginResponses(httpBackend, API_CONFIG);
    });

    beforeEach(function(){
        authService.logout();
    })

    it('redirects to profile main method', function() {
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
        authService.login(CREDENTIALS);
        httpBackend.flush();
        rootScope.logout(); 
        expect(rootScope.isAuthenticated()).toBe(false);
    });

});
