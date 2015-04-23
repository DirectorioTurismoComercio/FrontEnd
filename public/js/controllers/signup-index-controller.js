(function(){
	/**
	*  Module
	*
	* Description
	*/
	angular.module('gemStore')
	.controller('SignupIndexController', ['$scope', '$location', function($scope,$location){
		$location.path('roles');
	}]);
})();