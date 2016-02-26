describe('Index', function () {
    it('should have a title', function () {
        browser.get(browser.baseUrl + '/FrontEnd/public/#/signin');
        expect(browser.getTitle()).toEqual('mercatic');
    });
});