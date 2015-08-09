/**
* gemStore Module
*
* ProblemsShowController un solo problema para un usuario
*/
angular.module('gemStore')
.controller('QuestionsController',['$scope', '$location' , '$routeParams', 'questionnaireService',
  function($scope,$location, $routeParams,questionnaireService){
  var answersTemplateURL = "templates/questionnaires/";
   $scope.questionnaire = questionnaireService.getQuestionnaire($routeParams.idQuestionnaire);
   var currentQuestionIndex = 0;
   var maxIndex = $scope.questionnaire.preguntas.length - 1;

   changeQuestion();

   $scope.next = function()
   {
    currentQuestionIndex++;
    changeQuestion();
   }

   $scope.previous = function()
   {
    currentQuestionIndex--;
    changeQuestion();
    }  

    function changeQuestion()
    {
            if(currentQuestionIndex>maxIndex || currentQuestionIndex<0){
              $location.path('questionnaires');
            }else{

            $scope.currentQuestion = $scope.questionnaire.preguntas[currentQuestionIndex].pregunta;
            console.log($scope.questionnaire);

            switch($scope.currentQuestion.tipo_pregunta){
              case "U":
              $scope.answersTemplate = answersTemplateURL + "_u_question.html";
              break;
              case "M":
              $scope.answersTemplate = answersTemplateURL + "_m_question.html";
              break;
              case "L":
              $scope.answersTemplate = answersTemplateURL + "_l_question.html";
              break;
            }

            }
    }
    

   

}]);