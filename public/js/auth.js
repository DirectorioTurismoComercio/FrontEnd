(function () {
	var auth = angular.module('auth',[]);
	auth.factory('authenticationService', ['$q', '$http', 'API_CONFIG', function($q, $http, API_CONFIG){
		var user = null;

		function checkForValidCredentials(c) {
			if(c === undefined || c.password === undefined) 
				throw Error("crendentials should contain username and password");
		}
			
		return {
			login: function(credentials){
				checkForValidCredentials(credentials);
				var deferred = $q.defer();
				$http.post(API_CONFIG.url + API_CONFIG.login, credentials)
					.success(function(response){
						user = {
							name:credentials.username,
							token: response.key
						};
						deferred.resolve();
					})
					.error(function(){
						deferred.reject();
					});
				return deferred.promise;
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