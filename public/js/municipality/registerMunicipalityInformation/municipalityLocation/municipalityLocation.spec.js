'use strict';

describe('Controller: municipalityLocationController', function () {
    var municipalityLocationController, $scope, deferred, testLocation;

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


    beforeEach(inject(function ($controller,$q,$rootScope, $location) {
        $scope = $rootScope.$new();
        deferred = $q.defer();
        testLocation=$location;


        spyOn($location,'path');

        municipalityLocationController = $controller('municipalityLocationController', {
            $scope: $scope,
            $location:testLocation
        });
    }));



});