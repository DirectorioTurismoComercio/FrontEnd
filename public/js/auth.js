(function () {
	var auth = angular.module('auth',[]);
	auth.factory('authenticationService', ['$http', 'API_CONFIG', function($http, API_CONFIG){
		var user = null;

		function checkForValidCredentials(c) {
			if(c === undefined || c.password === undefined) 
				throw Error("crendentials should contain username and password");
		}
			
		return {
			login: function(credentials){
				checkForValidCredentials(credentials);
				$http.post(API_CONFIG.url + API_CONFIG.login);
				user = {
					name:credentials.username
				};
			},
			getUser: function(){
				return user;
			}
		}
	}]);
	auth.factory('isUserLoggedIn', ['authenticationService', function(authenticationService) {
	    return function(){
	        return !(authenticationService.getUser() === null);
	    };
	}]);
}())