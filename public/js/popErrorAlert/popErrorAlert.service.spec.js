describe('popErrorAlert Service', function () {

    var popErrorAlertService, mdDialog;

    beforeEach(module('gemStore'));
    beforeEach(module('popErrorAlert'));
    beforeEach(inject(function ($injector) {

        popErrorAlertService = $injector.get('popErrorAlertService');
        mdDialog = $injector.get('$mdDialog');

        spyOn(mdDialog, 'show');

    }));

    it('should set and get current searched site', function () {
        popErrorAlertService.showPopErrorAlert('message');
        expect(mdDialog.show).toHaveBeenCalled();
    });
});
