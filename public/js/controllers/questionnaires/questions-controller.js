/**
* gemStore Module
*
* ProblemsShowController un solo problema para un usuario
*/
angular.module('gemStore')
.controller('QuestionsController',['$scope', '$location' , '$routeParams', 'questionnaireService', 'Constantes',
  function($scope,$location, $routeParams,questionnaireService, Constantes){
  $scope.ruta = Constantes.ruta_imagenes + 'botones/';  
  $scope.siguiente = $scope.ruta+'boton-siguiente-over.png';
  $scope.anterior = $scope.ruta+'boton-regresar-over.png';
  var answersTemplateURL = "templates/questionnaires/";
   $scope.questionnaire = questionnaireService.getQuestionnaire($routeParams.idQuestionnaire);
   var currentQuestionIndex = 0;
   var maxIndex = $scope.questionnaire.preguntas.length - 1;
   $scope.questionnaire.enable=true;
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
    $scope.uclick = function (idOpcion)
    {
    console.log('eee', idOpcion)      ;
       for(var i=0; i<$scope.currentQuestion.opciones.length;i++)
       {
        
        questionnaireService.removeAnswer($scope.currentQuestion.opciones[i].id);
       }      
       questionnaireService.addAnswer(parseInt(idOpcion));
       console.log(questionnaireService.getAnswers());

    }
    $scope.mclick = function (idOpcion,dato)
    {
       if(dato){
          questionnaireService.addAnswer(parseInt(idOpcion));
       }
       else{
        questionnaireService.removeAnswer(idOpcion);
       }
      console.log(questionnaireService.getAnswers());

    }
    function activeQuestion()
    {
      var dependencia_respuestas = $scope.questionnaire.preguntas[currentQuestionIndex].dependencia_respuestas;
      console.log(dependencia_respuestas);
      if(dependencia_respuestas.length==0){
        return true;
      }
      for(var k=0;k<dependencia_respuestas.length;k++)
      {
        if(questionnaireService.getAnswers().indexOf(parseInt(dependencia_respuestas[k]))!=-1) return true;
      }
      return false;
    }
    function changeQuestion()
    {
            if(currentQuestionIndex>maxIndex || currentQuestionIndex<0){                            
              if (currentQuestionIndex>maxIndex) {
                questionnaireService.setFull($routeParams.idQuestionnaire);  
                questionnaireService.setConta();  
              };
              $location.path('questionnaires');              
            }else{

            $scope.currentQuestion = $scope.questionnaire.preguntas[currentQuestionIndex].pregunta;
            if(activeQuestion())
            {
                $scope.questionnaire.preguntas[currentQuestionIndex].enable=true;
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
              else
              {
                $scope.questionnaire.preguntas[currentQuestionIndex].enable=false;
                $scope.next();
              }

            }
    }
    $scope.oyb = function(dato){          
      type = questionnaireService.getTipo();          
      if (type == dato) {
        return true;
      } else{
        return false; 
      };
    }

}]);