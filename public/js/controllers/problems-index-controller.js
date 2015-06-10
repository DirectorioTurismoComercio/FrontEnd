/**
* gemStore Module
*
* ProblemsIndexController todos los problemas asociados a un usuario
*/
angular.module('gemStore')
.controller('ProblemsIndexController',function(ProblemFactory, $scope,$routeParams, $location){
  $scope.idUser  = $routeParams.idUser;
  // query instead of get because I need an array here
	$scope.problems      = ProblemFactory.query({id: $routeParams.idUser});
	$scope.problems.$promise.then(function(data){
   		console.log("get query success, data:",data);
    })
    .catch(function(errors){
   		console.log(errors);
    })
    .finally(function(){
   		console.log("in finally");
    });
});