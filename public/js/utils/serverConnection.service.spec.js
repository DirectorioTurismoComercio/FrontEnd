describe('municipalityInformationService', function () {

    var serverConnectionService, messageService;

    beforeEach(module('gemStore'));
    beforeEach(module('utils'));
    beforeEach(inject(function ($injector) {

        serverConnectionService = $injector.get('serverConnectionService');
        messageService=$injector.get("messageService");

        spyOn(messageService,'showErrorMessage');

    }));

    it('should show error message when timeout error', function () {
        var e={
            status:0,
            statusText:""
        };
        serverConnectionService.checkTimeOutError(e);
        expect(messageService.showErrorMessage).toHaveBeenCalled();
    });

});