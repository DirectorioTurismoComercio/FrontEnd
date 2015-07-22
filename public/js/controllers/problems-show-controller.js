/**
* gemStore Module
*
* ProblemsShowController un solo problema para un usuario
*/
angular.module('gemStore')
.controller('ProblemsShowController',function(ProblemFactory, $scope,$routeParams, $location,registroService){
	var idUsuario = registroService.getUsuario().id;
	$scope.idUser = idUsuario;
	$scope.problem = ProblemFactory.get({id: idUsuario,idProblem: $routeParams.idProblem });
	
	$scope.deleteProblem = function(problem){
		problem.$remove({id:idUsuario,idProblem:$routeParams.idProblem})
		.then(function(){
			console.log("borrado exitosamente: ",problem);
		})
		.catch(function(error){
			console.log("remove problem in server errors: ",error);
		})
		.finally(function(){
			$location.path("/user/"+$scope.idUser+"/problem/");
		});
	};
});