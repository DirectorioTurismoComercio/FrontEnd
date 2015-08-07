/**
* gemStore Module
*
* ProblemsShowController un solo problema para un usuario
*/
angular.module('gemStore')
.controller('QuestionsController',['$scope', '$routeParams', 'questionnaireService',
  function($scope,$routeParams,questionnaireService){
  
   $scope.questionnaire = questionnaireService.getQuestionnaire($routeParams.idQuestionnaire);
   var currentQuestionIndex = 0;
   var maxIndex = $scope.questionnaire.preguntas.length - 1;
   $scope.currentQuestion = $scope.questionnaire.preguntas[currentQuestionIndex];

   $scope.next = function()
   {
    currentQuestionIndex++;
    if(currentQuestionIndex>maxIndex)
    {
      
    }

    $scope.currentQuestion = $scope.questionnaire.preguntas[currentQuestionIndex];

   }

   $scope.previuos = function()
   {
    currentQuestionIndex--;
    $scope.currentQuestion = $scope.questionnaire.preguntas[currentQuestionIndex];

   }
   
   

}]);