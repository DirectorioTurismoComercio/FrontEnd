'use strict';

describe('Controller: municipalityRouteController', function () {
    var registerMunicipalityAccountController, $scope, testLocation;

    beforeEach(module('gemStore'));
    beforeEach(module('Municipality'));


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


    beforeEach(inject(function ($controller, $rootScope, $location) {
        $scope = $rootScope.$new();
        testLocation=$location;


        spyOn($location,'path');


        registerMunicipalityAccountController = $controller('municipalityRouteController', {
            $scope: $scope,
            $location:testLocation
        });
    }));


    it('Should redirect to municipality account if user clicks changeViewMunicipalityAccount', function () {
        $scope.changeViewMunicipalityAccount();
        expect(testLocation.path).toHaveBeenCalled();
    });
});