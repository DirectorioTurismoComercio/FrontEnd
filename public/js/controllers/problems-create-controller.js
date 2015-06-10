/**
* gemStore Module
*
* ProblemsCreateController
*/
angular.module('gemStore')
.controller('ProblemsCreateController', function(ProblemFactory, $scope, $routeParams, $location){
	$scope.problem = new ProblemFactory();
	//TODO: create category model
	$scope.problem.categoria=[];
	$scope.problem.usuario  =Number($routeParams.idUser);
	$scope.isSubmitting     =false;
	$scope.saveProblem      =function(problem){
		$scope.isSubmitting =true;
		problem.$save({id:$routeParams.idUser})
		.then(function(problem){
			// console.log("------this is the problem returned from server: ",problem);
			$location.path("user/"+$routeParams.idUser+"/problem/"+problem.id);
		}).catch(function(errors){
			//validations
			console.log("SAVING PROBLEM - ERRORS returned from server: ",errors);
		}).finally(function(){
			$scope.isSubmitting = false;
		});
	};
});