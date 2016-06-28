'use strict';

describe('Controller: HeaderController', function () {
    var appHeaderController, $scope, deferred, translate, testsiteAndTownSaverService, testLocation, testauthenticationService, test$auth;

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


    beforeEach(inject(function ($controller, $rootScope, $q, $translate, siteAndTownSaverService,$location, authenticationService, $auth) {
        $scope = $rootScope.$new();
        deferred = $q.defer();
        translate=$translate;
        testsiteAndTownSaverService=siteAndTownSaverService;
        testLocation=$location;
        testauthenticationService=authenticationService;
        test$auth=$auth;

        spyOn(translate, 'use');
        spyOn(siteAndTownSaverService, 'resetSearchAndRoute');
        spyOn($location,'path');
        spyOn(authenticationService,'logout').and.returnValue(deferred.promise);
        spyOn($auth,'logout');
        appHeaderController = $controller('appHeaderController', {
            $scope: $scope,
            $translate:translate,
            siteAndTownSaverService:testsiteAndTownSaverService,
            $location:$location,
            authenticationService:testauthenticationService,
            $auth:test$auth
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

    it('Should log out when user click on log out link', function () {
        $scope.logOut();
        deferred.resolve([]);
        $scope.$apply();
        expect(test$auth.logout).toHaveBeenCalled();
    });

});