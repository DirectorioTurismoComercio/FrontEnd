/**
* gemStore Module
*
* ProblemsShowController un solo problema para un usuario
*/
angular.module('gemStore')
.controller('QuestionnaireController',['$scope', 'QuestionnaireFactory', 'questionnaireService',
  function($scope,QuestionnaireFactory,questionnaireService){
     
     if(!questionnaireService.getQuestionnaires())
     { 
          promesa = QuestionnaireFactory.query().$promise.
          then(function(questionnaires){
          for(var k=0;k<questionnaires.length;k++)
          {  
            for(var i=0; i<questionnaires[k].preguntas.length;i++)
            {
              console.log(questionnaires[k].preguntas[i]);
              
              for(var j=0;j<questionnaires[k].preguntas[i].opciones.length;j++)
              {
                questionnaires[k].preguntas[i].opciones[j].dato=false;
                
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
   

}]);