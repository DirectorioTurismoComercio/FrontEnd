/**
* gemStore Module
*
* ProblemsShowController un solo problema para un usuario
*/
angular.module('gemStore')
.controller('QuestionsController',['$scope', '$location' , '$routeParams', 'questionnaireService',
  function($scope,$location, $routeParams,questionnaireService){
  
   $scope.questionnaire = questionnaireService.getQuestionnaire($routeParams.idQuestionnaire);
   var currentQuestionIndex = 0;
   var maxIndex = $scope.questionnaire.preguntas.length - 1;
   $scope.currentQuestion = $scope.questionnaire.preguntas[currentQuestionIndex];

   $scope.next = function()
   {
    currentQuestionIndex++;
    if(currentQuestionIndex>maxIndex)
    {
      $location.path('questionnaires');
    }

    $scope.currentQuestion = $scope.questionnaire.preguntas[currentQuestionIndex];

   }

   $scope.previous = function()
   {
    currentQuestionIndex--;
    if(currentQuestionIndex<0)
    {
      $location.path('questionnaires');
    }  

    $scope.currentQuestion = $scope.questionnaire.preguntas[currentQuestionIndex];

   }
   
   

}]);