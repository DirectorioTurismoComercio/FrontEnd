/**
* gemStore Module
*
* ProblemsIndexController solo para un usuario
*/
angular.module('gemStore')
.controller('ProblemsIndexController',function(ProblemFactory, $scope,$routeParams, $location){
	$scope.problems      = ProblemFactory.get({id: $routeParams.id});
	console.log($scope.problems);
});