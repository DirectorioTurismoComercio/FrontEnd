/**
* gemStore Module
*
* ProblemsShowController un solo problema para un usuario
*/
angular.module('gemStore')
.controller('QuestionnaireController',['$scope', 'QuestionnaireFactory', 'questionnaireService','$location', 'Constantes', 'navBar', 'SolutionFactory', 'autenticacionService',
  function($scope,QuestionnaireFactory,questionnaireService,$location, Constantes, navBar, SolutionFactory, autenticacionService){
    $scope.ruta = Constantes.ruta_imagenes+'botones/'; 
    $scope.anterior = $scope.ruta+'boton-regresar.png';    
    $scope.buscar = $scope.ruta+'icono-comenzar.png';    
    $scope.nodata = false;
    var rol = questionnaireService.getRol();     
    var tipo = questionnaireService.getTipo();              
    
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
      promesa = QuestionnaireFactory.query({id:rol,tipo: tipo}).$promise.then(function(questionnaires){
        if (questionnaires.length === 0) {
          $scope.nodata = true;
        }         
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
        $scope.load = false;
      });
    }
    else
    {
      $scope.questionnaires = questionnaireService.getQuestionnaires();
    }

    $scope.goBack = function(){
      var user = autenticacionService.getUser().id;
      if (user === undefined)
        $scope.changeView("rolquestionnaire");
      else
        $scope.changeView("profileMain");
    }

    $scope.changeView = function(view){
      questionnaireService.changeView(view);
    }
     //Ofreciendo buscando
    $scope.oyb = function(dato){
      type = questionnaireService.getTipo();          
      if (type == dato) {
        return true;
      } else {
        return false; 
      };
    }

    $scope.revisar = function(_id){
      return questionnaireService.getFull(_id);    
    }

    $scope.b_buscar = function(){
      return true; questionnaireService.hasAnyAnswerBeenCompleted();
    }

    $scope.buscar = function(){      
      $location.path('solutions');
    }

    $scope.summary = function(){      
      $location.path('questionnaires/summary');
    }
}]);