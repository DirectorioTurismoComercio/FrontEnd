angular.module('gemStore')
.controller('QuestionnaireSummaryController',['$scope', '$location' , '$routeParams', 'questionnaireService','Constantes',
  function($scope,$location, $routeParams,questionnaireService,Constantes){
  $scope.questionnaires = questionnaireService.getQuestionnaires();
  $scope.ruta         = Constantes.ruta_imagenes;
  	$scope.back = function()
  	{
  		$location.path('questionnaires');
  	}
//Editar respuestas
  	$scope.edit = function(_id){
  		console.log(_id);
  		$location.path('questionnaires/questionnaire/'+_id);
  	}

}]);