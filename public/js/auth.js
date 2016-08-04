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
			$window.localStorage["user"] = null;
		}

	
		function userDataRequest(credentials, token, deferred){
			$http.get(API_CONFIG.url  + API_CONFIG.user_detail, { headers: {'Authorization': 'Token ' + token} })
				.success(function(response){
					user = response;
					user.token = token;
					user.name = credentials.username;
					$window.localStorage["user"] = JSON.stringify(user);
					deferred.resolve();
				});
		}


			
		return {
			login: function(credentials){
				checkForValidCredentials(credentials);
				var deferred = $q.defer();
				$http.post(API_CONFIG.url + API_CONFIG.login, credentials)
					.success(function(response){
						var token = response.key;
						userDataRequest(credentials,token, deferred);
					})
					.error(function(){
						deferred.reject();
					});
				return deferred.promise;
			},
			loginSocialMedia: function(credentials, token, deferred){
				userDataRequest(credentials, token, deferred)
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
			setUserByToken: function(token,deferred){
				
				userDataRequest('',token, deferred);
				return deferred.promise;
			},
			getUser: function(){
				if ($window.localStorage["user"]) {
	            user = JSON.parse($window.localStorage["user"]);
	        	}
				return user;
			},
			setUser: function(_user,token){
					user = _user;
					user.token = token;
					$window.localStorage["user"] = JSON.stringify(user);
			},
			reset: function() {
				clearUserData();
			},
			getUserData: function(token){
				return  $http.get(API_CONFIG.url  + API_CONFIG.user_detail, { headers: {'Authorization': 'Token ' + token} });
			}
		}
	}]);
	auth.factory('isUserLoggedIn', ['authenticationService', function(authenticationService) {
	    return function(){
	    	return !(authenticationService.getUser() === null);
	    };
	}]);
}())