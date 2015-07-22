/**
* gemStore Module
*
* ProblemsIndexController todos los problemas asociados a un usuario
*/
angular.module('gemStore')
.controller('ProblemsIndexController',function(CategoryFactory, ProblemFactory, $scope,$routeParams, $location,registroService){
  $scope.idUser  = registroService.getUsuario().id;

  // query instead of get because I need an array here
	$scope.problems      = ProblemFactory.query({id: $scope.idUser});
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