'use strict';

describe('Controller: HeaderController', function () {
    var appHeaderController, $scope, deferred, translate;

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


    beforeEach(inject(function ($controller, $rootScope, $q, $translate) {
        $scope = $rootScope.$new();
        deferred = $q.defer();
        translate=$translate;

        spyOn(translate, 'use');

        appHeaderController = $controller('appHeaderController', {
            $scope: $scope,
            $translate:translate
        });
    }));


    it('Should transate clicking on some country flag', function () {
        $scope.changeLanguage();
        expect(translate.use).toHaveBeenCalled();
    });

});