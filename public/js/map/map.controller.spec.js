'use strict';

describe('Controller: MapController', function () {

    beforeEach(module('gemStore'));

    var MapController, scope;

    // Initialize the controller and a mock scope
    beforeEach(inject(function ($controller, $rootScope) {
        scope = $rootScope.$new();
        MapController = $controller('MapController', {
            $scope: scope
        });
    }));

    it('should ...', function () {
        expect(1).toEqual(1);
    });
});
