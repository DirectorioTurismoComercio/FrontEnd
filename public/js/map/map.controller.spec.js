'use strict';

describe('Controller: MapController', function () {

    beforeEach(module('gemStore'));
    //beforeEach(module('map'));

    var MapCtrl, scope;

    // Initialize the controller and a mock scope
    beforeEach(inject(function ($controller, $rootScope) {
        scope = $rootScope.$new();
        MapCtrl = $controller('MapController', {
            $scope: scope
        });
    }));

    it('should ...', function () {
        expect(1).toEqual(1);
    });
});
