'use strict';

describe('Controller: MapController', function () {
    var MapController, scope;

    beforeEach(module('gemStore'));

    beforeEach(inject(function ($controller, $rootScope) {
        scope = $rootScope.$new();
        MapController = $controller('MapController', {
            $scope: scope
        });
    }));

    it('should ...', function () {
    });
});
