var setupLoginResponses = function(httpBackend, API_CONFIG) {
	var requestHandler = httpBackend.when('POST', API_CONFIG.url + API_CONFIG.login)
    	.respond(LOGIN_API_RESPONSE);
    httpBackend.when('GET', API_CONFIG.url + API_CONFIG.user)
    	.respond(USER_API_RESPONSE);
    httpBackend.when('POST', API_CONFIG.url + API_CONFIG.logout)
    		.respond({});
    return requestHandler;
}