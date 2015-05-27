/**
* gemStore Module
*
* ProblemsShowController solo para un usuario
*/
angular.module('gemStore')
.controller('ProblemsShowController',function(ProblemFactory, $scope,$routeParams, $location){
	// $scope.problems      = ProblemFactory.get({id: $routeParams.id})
	console.log("$routeParams.id",$routeParams.id);
	console.log($scope.problems);
	$scope.problems      = ProblemFactory.query({id: $routeParams.id});
	$scope.problems.$promise.then(function(){
   		console.log("get query success");
    })
    .catch(function(errors){
   		console.log(errors);
    })
    .finally(function(){
   		console.log("in finally");
    });
	console.log("$scope.problems: ",$scope.problems);
});