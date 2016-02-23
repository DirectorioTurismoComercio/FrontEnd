describe('Test suit that tests Directive', function () {

    beforeEach(module('userModule'));
    beforeEach(module('gemStore'));

    beforeEach(module('templates/directives/side-bar.html'));

    var $compile,
        $rootScope,
        $mockRoute,
        $httpBackend,
        element,
        mockAutenticacionService,
        mockLocation;

    beforeEach(inject(function(_$compile_, _$rootScope_, $injector, _$route_, $location, autenticacionService) {

        $compile = _$compile_;
        $rootScope = _$rootScope_;
        $mockRoute=_$route_;
        mockAutenticacionService=autenticacionService;
        mockLocation=$location;
        spyOn(mockAutenticacionService, 'isOnProfileMainMenu').and.callFake(function () {
            return true;
         });

        $httpBackend = $injector.get('$httpBackend');
        $httpBackend.whenGET('templates/signin/signin.html').respond(200, '');

        element = $compile("<side-bar></side-bar>")($rootScope);

        $rootScope.$digest();

    }));

    it('Should have a redirect to profile main method', function() {
        expect($rootScope.redirectToProfileMain).toBeDefined();
    });

});
