describe('popErrorAlert Service', function () {

    var messageService, mdDialog, translate;

    beforeEach(module('gemStore'));
    beforeEach(module('message'));


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


    beforeEach(inject(function ($injector) {

        messageService = $injector.get('messageService');
        mdDialog = $injector.get('$mdDialog');
        translate=$injector.get('$translate');

        spyOn(mdDialog, 'show');
        spyOn(translate, 'instant');

    }));

    it('should call mdDialog', function () {
        messageService.showErrorMessage('message');
        expect(mdDialog.show).toHaveBeenCalled();
    });
});
