/**
* gemStore Module
*
* ProblemsShowController un solo problema para un usuario
*/
angular.module('gemStore')
.controller('QuestionnaireController',['$scope', 'QuestionnaireFactory', 'questionnaireService','$location',
  function($scope,QuestionnaireFactory,questionnaireService,$location){
     
     if(!questionnaireService.getQuestionnaires())
     { 
          promesa = QuestionnaireFactory.query().$promise.
          then(function(questionnaires){
          for(var k=0;k<questionnaires.length;k++)
          {  

            for(var i=0; i<questionnaires[k].preguntas.length;i++)
            {
              
              questionnaires[k].preguntas[i].pregunta.dato=0;
              for(var j=0;j<questionnaires[k].preguntas[i].pregunta.opciones.length;j++)
              {
                questionnaires[k].preguntas[i].pregunta.opciones[j].dato=false;
                
              }
              
            } 
          }
          questionnaireService.setQuestionnaires(questionnaires);
          $scope.questionnaires = questionnaireService.getQuestionnaires();

          
        })
        .catch(function(errors){
          console.log(errors);
        })
        .finally(function(){
          console.log("in finally");
        });
     }
     else
     {
      $scope.questionnaires = questionnaireService.getQuestionnaires();
     }

     $scope.summary = function(){
      $location.path('questionnaires/summary');
     }

   

}]);