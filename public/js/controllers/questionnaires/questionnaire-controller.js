/**
* gemStore Module
*
* ProblemsShowController un solo problema para un usuario
*/
angular.module('gemStore')
.controller('QuestionnaireController',['$scope', 'QuestionnaireFactory', 'questionnaireService','$location', 'Constantes', 'navBar', 'SolutionFactory',
  function($scope,QuestionnaireFactory,questionnaireService,$location, Constantes, navBar, SolutionFactory){
     $scope.ruta = Constantes.ruta_imagenes+'botones/'; 
     $scope.anterior = $scope.ruta+'boton-regresar.png';    
     $scope.buscar = $scope.ruta+'icono-comenzar.png';    
     var rol = questionnaireService.getRol();     
     var tipo = questionnaireService.getTipo();              
     console.log(rol);
     console.log(tipo);
     console.log(!questionnaireService.getQuestionnaires());     
    $scope.toggleRight = function(){                                
      navBar.open();
    }

    $scope.close= function(){
      navBar.close();
    }

    $scope.menu_bar = function (view){
      questionnaireService.changeView(view);                      
    }
    
     if(!questionnaireService.getQuestionnaires())
     {    
        $scope.load = true;     
          console.log(rol, tipo);
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
          $scope.load = false;
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
      console.log(questionnaireService.getConta());
        if (questionnaireService.getConta() >= 1) {
          return true;
        } else {
          return false;
        };
    }

    $scope.buscar = function(){      

      //     SolutionFactory.get({cuestionario:qf,pagina:1});
          // SolutionFactory.post(qf,1);
          // SolutionFactory.get(qf,1);
      //     .then(function(proceso){
      //       console.log(proceso);
      //     }).catch(function(error){
      //       console.log(error);
      // });
       $location.path('solutions');
    }

     $scope.summary = function(){      
      $location.path('questionnaires/summary');
     }

   

}]);