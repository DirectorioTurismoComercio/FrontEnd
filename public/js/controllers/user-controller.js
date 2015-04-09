(function(){
	angular.module('userModule', [])
	.controller('UserController',['$http', '$scope', 'Constantes','UserFactory','RoleFactory',
		function($http, $scope, Constantes, UserFactory, RoleFactory){
	        RoleFactory.query(function (roles){
	        	// $scope.roles = [{id:"1","name":"Empresario"},{id:"2","name":"Empre"}];
	        	// debugger;
	        	console.log(roles);
	        	$scope.roles = roles;
	        },function (error){
	        	console.log("Error.status", error.status);
	        });
	      $scope.update = function(user) {
	      	// product = {"producto":user};
        	console.log(user);
	      	// debugger;
	        UserFactory.save(user, function(user){
	        	console.log(user);
	        	// debugger;
	        },function (error){
	        	console.log("Error.status",error.status);
	        	console.log("Error",error);
	        	// debugger;
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