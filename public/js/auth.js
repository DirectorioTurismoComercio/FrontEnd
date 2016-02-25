(function () {
	var auth = angular.module('auth',[]);
	auth.factory('authenticationService', ['$window', '$q', '$http', 'API_CONFIG', function($window, $q, $http, API_CONFIG){
		var user = null;

		function checkForValidCredentials(c) {
			if(c === undefined || c.password === undefined) 
				throw Error("crendentials should contain username and password");
		}

		function clearUserData() {
			user = null;
			$window.sessionStorage["user"] = null;
		}

		function init() {
	        if ($window.sessionStorage["user"]) {
	            user = JSON.parse($window.sessionStorage["user"]);
	        }
	    }
	    init();
			
		return {
			login: function(credentials){
				checkForValidCredentials(credentials);
				var deferred = $q.defer();
				$http.post(API_CONFIG.url + API_CONFIG.login, credentials)
					.success(function(response){
						var token = response.key;
						$http.get(API_CONFIG.url + API_CONFIG.user, { headers: {'Authorization': 'Token ' + token} })
							.success(function(response){
								user = response;
								user.token = token;
								user.name = credentials.username;
								$window.sessionStorage["user"] = JSON.stringify(user);
								deferred.resolve();
							});
					})
					.error(function(){
						deferred.reject();
					});
				return deferred.promise;
			},
			logout: function() {
				var deferred = $q.defer();
				var token = user != null ? user.token : null;
				$http.post(API_CONFIG.url + API_CONFIG.logout, {}, { headers: {'Authorization': 'Token ' + token} })
					.success(function(response){
						deferred.resolve();
					})
					.error(function(){
						deferred.reject();
					})
					.finally(function(){
						clearUserData();
					});
				return deferred.promise;
			},
			getUser: function(){
				return user;
			},
			reset: function() {
				clearUserData();
			}
		}
	}]);
	auth.factory('isUserLoggedIn', ['authenticationService', function(authenticationService) {
	    return function(){
	    	return !(authenticationService.getUser() === null);
	    };
	}]);
}())