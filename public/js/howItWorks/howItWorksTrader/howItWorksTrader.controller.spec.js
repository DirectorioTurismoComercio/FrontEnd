'use strict';

describe('Controller: HowItWorksController', function () {
    var HowItWorksController, $scope, deferred, location;

    beforeEach(module('gemStore'));
    beforeEach(module('howItWorks'));


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


    beforeEach(inject(function ($controller, $rootScope, $q, $location) {
        $scope = $rootScope.$new();
        location = $location;

        spyOn(location, 'path');

        HowItWorksController = $controller('HowItWorksTraderController', {
            $scope: $scope,
            $location: location
        });
    }));

    it('Should redirect to register trader on click button register', function () {
        $scope.goToRegisterSite();
        expect(location.path).toHaveBeenCalled();
    });

});