(function(){
	angular.module('userModule', [])
	.controller('UserController',['$http', '$scope', 'Constantes','UserFactory','RoleFactory',
		function($http, $scope, Constantes, UserFactory, RoleFactory){
	        RoleFactory.query(function (roles){
	        	$scope.roles = roles;
	        },function (error){
	        	console.log("Error.status", error.status);
	        });
	      $scope.update = function(user) {
	    	console.log(user);
	        UserFactory.save(user, function(user){
	        	console.log(user);
	        },function (error){
	        	console.log("Error.status",error.status);
	        	console.log("Error",error);
	        });
	      };
		  $scope.master = {};
	      $scope.reset = function() {
	        $scope.user = angular.copy($scope.master);
	      };
	      $scope.reset();
		}
	]);
	var gem = {name:"andres"};
})();