/**
* gemStore Module
*
* ProblemsShowController un solo problema para un usuario
*/
angular.module('gemStore')
.controller('QuestionnaireController',['$scope', 'QuestionnaireFactory', 'questionnaireService','$location', 'Constantes',
  function($scope,QuestionnaireFactory,questionnaireService,$location, Constantes){
     $scope.ruta = Constantes.ruta_imagenes+'botones/';
     
     var rol = questionnaireService.getRol();     
     var tipo = questionnaireService.getTipo();              
     console.log(rol);
     console.log(tipo);
     console.log(!questionnaireService.getQuestionnaires());     
     if(!questionnaireService.getQuestionnaires())
     { 
          promesa = QuestionnaireFactory.query({id:rol,tipo: tipo}).$promise.
          then(function(questionnaires){
          for(var k=0;k<questionnaires.length;k++)
          {  
            questionnaires[k].enable=false;
            for(var i=0; i<questionnaires[k].preguntas.length;i++)
            {
              questionnaires[k].preguntas[i].enable=false;
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


     $scope.changeView = function(view){
      questionnaireService.changeView(view);
     }
     //Ofreciendo buscando
    $scope.oyb = function(dato){          
      type = questionnaireService.getTipo();          
      if (type == dato) {
        return true;
      } else{
        return false; 
      };
    }

    $scope.revisar = function(_id){
       return questionnaireService.getFull(_id);    
    }

    $scope.b_buscar = function(){
      console.log(questionnaireService.getConta() );
        if (questionnaireService.getConta() >= 3) {
          return true;
        } else {
          return false;
        };
    }

    $scope.buscar = function(){
      $location.path('personalData');
    }

     $scope.summary = function(){
      $location.path('questionnaires/summary');
     }

   

}]);