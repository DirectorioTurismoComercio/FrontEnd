angular.module('gemStore')
.controller('QuestionnaireSummaryController',['$scope', '$location' , '$routeParams', 'questionnaireService','Constantes',
  function($scope,$location, $routeParams,questionnaireService,Constantes){
  $scope.questionnaires = questionnaireService.getQuestionnaires();
  $scope.ruta = Constantes.ruta_imagenes + 'botones/';  
  $scope.editar = $scope.ruta+'editar.png';
  $scope.borrar = $scope.ruta+'borrar.png';
  $scope.pageClass="page-summary";
  console.log('Cuestionario',$scope.questionnaires);
  	$scope.back = function()
  	{
  		$location.path('questionnaires');
  	}
//Editar respuestas
  	$scope.edit = function(_id){
  		console.log(_id);
  		$location.path('questionnaires/questionnaire/'+_id);
  	}

    //Quitar Categoria
    $scope.remove = function(_id){      
      $scope.questionnaires[_id].enable = false;
      questionnaireService.setConta(-1);
      questionnaireService.clearFull(_id);
    }

}]);