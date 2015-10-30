(function(){
	angular.module('gemStore')
	.controller('ProfileMainController', ['$scope','Constantes','$location',
		function($scope,Constantes,$location){                              	
      
      $scope.profile = function(){
        $location.path('/profileUpdate');
      } 

      $scope.new_b = function(){
        $location.path('/actionquestionnaire');
      } 
		}
	]);
})();