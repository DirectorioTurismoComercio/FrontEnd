'use strict';

describe('Controller: HomeController', function () {
    var homeController, scope;

    beforeEach(module('gemStore'));

    beforeEach(inject(function ($controller, $rootScope) {
        scope = $rootScope.$new();
        homeController = $controller('HomeController', {
            $scope: scope
        });
    }));

    it('Search callback should exist', function () {
        expect(scope.doSearch).toBeDefined();
    });
});