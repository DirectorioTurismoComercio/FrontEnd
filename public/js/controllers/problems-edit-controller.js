/**
* gemStore Module
*
* ProblemEditController
*/
angular.module('gemStore')
.controller('ProblemsEditController', function(ProblemFactory, $scope, $routeParams, $location){
	$scope.problem = ProblemFactory.get({id: $routeParams.idUser,idProblem: $routeParams.idProblem });
	console.log("$scope.problem: ",$scope.problem);
	$scope.isSubmitting = false;
	$scope.remove_tag = function(index){	
       $scope.problem.tags.splice(index,1);    
	}
	$scope.add_tag = function(new_tag)
	{
		$scope.problem.tags.push(new_tag);	
	}
	$scope.saveProblem = function(problem){
		$scope.isSubmitting = true;
		console.log("problem:",problem);
		problem.$update({id:$routeParams.idUser,idProblem:$routeParams.idProblem})
		.then(function(problem){
			console.log("problema guardado exitosamente: ",problem);
		})
		.catch(function(error){
			console.log("Update problem in server errors: ",error);
		})
		.finally(function(){
			$scope.isSubmitting = false;
			$location.path("/user/"+$routeParams.idUser+"/problem/"+$routeParams.idProblem);
		});
	};
});