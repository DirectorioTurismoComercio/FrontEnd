describe('popErrorAlert Service', function () {

    var messageService, mdDialog;

    beforeEach(module('gemStore'));
    beforeEach(module('popErrorAlert'));
    beforeEach(inject(function ($injector) {

        messageService = $injector.get('messageService');
        mdDialog = $injector.get('$mdDialog');

        spyOn(mdDialog, 'show');

    }));

    it('should set and get current searched site', function () {
        messageService.showErrorMessage('message');
        expect(mdDialog.show).toHaveBeenCalled();
    });
});
