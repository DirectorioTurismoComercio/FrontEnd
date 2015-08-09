angular.module('gemStore')
.controller('QuestionnaireSummaryController',['$scope', '$location' , '$routeParams', 'questionnaireService',
  function($scope,$location, $routeParams,questionnaireService){
  $scope.questionnaires = questionnaireService.getQuestionnaires();
  	$scope.back = function()
  	{
  		$location.path('questionnaires');
  	}



}]);