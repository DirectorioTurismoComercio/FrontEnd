(function () {
	var auth = angular.module('auth',[]);
	auth.factory('authenticationService', function(){
		var user = null;
			
		return {
			login: function(){
				user = {};
			},
			getUser: function(){
				return user;
			}
		}
	});
	auth.factory('isUserLoggedIn', ['authenticationService', function(authenticationService) {
	    return function(){
	        return !(authenticationService.getUser() === null);
	    };
	}]);
}())