'use strict';

describe('Controller: HeaderController', function () {
    var appHeaderController, $scope, deferred, translate, testsiteAndTownSaverService, testLocation, testauthenticationService, test$auth, test$route, testnavigationService;

    beforeEach(module('gemStore'));
    beforeEach(module('appHeader'));


    beforeEach(module('gemStore', function ($provide, $translateProvider) {

        $provide.factory('customLoader', function ($q) {
            return function () {
                var deferred = $q.defer();
                deferred.resolve({});
                return deferred.promise;
            };
        });

        $translateProvider.useLoader('customLoader');

    }));


    beforeEach(inject(function ($controller, $rootScope, $q, $translate, siteAndTownSaverService,$location, authenticationService, $auth, $route, navigationService) {
        $scope = $rootScope.$new();
        deferred = $q.defer();
        translate=$translate;
        testsiteAndTownSaverService=siteAndTownSaverService;
        testLocation=$location;
        testauthenticationService=authenticationService;
        test$auth=$auth;
        test$route=$route;
        testnavigationService=navigationService;

        spyOn(translate, 'use');
        spyOn(siteAndTownSaverService, 'resetSearchAndRoute');
        spyOn($location,'path');
        spyOn(authenticationService,'logout').and.returnValue(deferred.promise);
        spyOn($auth,'logout');
        spyOn($route,'reload');
        appHeaderController = $controller('appHeaderController', {
            $scope: $scope,
            $translate:translate,
            siteAndTownSaverService:testsiteAndTownSaverService,
            $location:testLocation,
            authenticationService:testauthenticationService,
            $auth:test$auth,
            $route:test$route,
            navigationService:testnavigationService
        });
    }));


    it('Should translate clicking on some country initial', function () {
        $scope.changeLanguage();
        expect(translate.use).toHaveBeenCalled();
    });

    it('Should reset searched keyword and route on logo click', function () {
        $scope.goToHome();
        expect(testsiteAndTownSaverService.resetSearchAndRoute).toHaveBeenCalled();
    });

    it('Should go to home on logo click', function () {
        $scope.goToHome();
        expect(testLocation.path).toHaveBeenCalled();
    });

    /* Si se resuelve por qué al llamar $route no puede evaluarse $location.path().search; la prueba pasa*/
    xit('Should log out when user click on log out link', function () {
        $scope.logOut();
        deferred.resolve([]);
        $scope.$apply();
        expect(test$auth.logout).toHaveBeenCalled();
    });

    it('Should set to true ClickedLogoButton', function () {
        $scope.goToHome();
        expect(testnavigationService.hasClickedLogoButton()).toBe(true);
    });

});