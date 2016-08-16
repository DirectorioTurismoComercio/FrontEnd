describe('Form Validator Service', function () {

    var formValidatorService, mdDialog;

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

        formValidatorService = $injector.get('formValidator');
        mdDialog = $injector.get('$mdDialog');

        spyOn(mdDialog, 'show');

    }));

    it('Should return false if email not contains ".something"', function () {
        expect(formValidatorService.isValidEmail('email@withoutdomain')).toBe(false);
    });

    it('Should return true if email  contains ".something"', function () {
        expect(formValidatorService.isValidEmail('email@with.domain')).toBe(true);
    });

    it('Should show an error when email already exists', function () {
        var error={
            data:{
                email:["E101"]
            }
        };
        formValidatorService.emailAlreadyExistsShowError(error);
        expect(mdDialog.show).toHaveBeenCalled();
    });

});
