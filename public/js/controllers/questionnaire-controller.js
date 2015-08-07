/**
* gemStore Module
*
* ProblemsShowController un solo problema para un usuario
*/
angular.module('gemStore')
.controller('QuestionnaireController',['$scope', 'QuestionnaireFactory', 'questionnaireService',
  function($scope,QuestionnaireFactory,questionnaireService){
     var promesa = null;
     
     if(questionnaireService.getQuestionnaires())
     { 
     promesa = QuestionnaireFactory.query().$promise.
       then(function(data){
          questionnaireService.setQuestionnaires(data);
          console.log(questionnaireService);
          $scope.questionnaires = questionnaireService.getQuestionnaires();
          console.log(questionnaireService.getQuestionnaires());
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