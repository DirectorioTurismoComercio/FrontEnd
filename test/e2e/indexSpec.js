describe('Index', function() {
	it('should have a title', function() {
		browser.get('http://localhost/ecosistema/FrontEnd/public/#/signin');
		expect(browser.getTitle()).toEqual('mercatic');
	});
});