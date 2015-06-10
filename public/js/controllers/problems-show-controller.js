/**
* gemStore Module
*
* ProblemsShowController un solo problema para un usuario
*/
angular.module('gemStore')
.controller('ProblemsShowController',function(ProblemFactory, $scope,$routeParams, $location){
	$scope.idUser  = $routeParams.idUser;
	$scope.problem = ProblemFactory.get({id: $routeParams.idUser,idProblem: $routeParams.idProblem });
	$scope.deleteProblem = function(problem){
		problem.$remove()
		.then(function(){
			$location.path("/user/"+$routeParams.idUser+"/problem/");
		});
	};
});