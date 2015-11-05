(function(){
	angular.module('gemStore')
	.controller('ProfileSearchDetailController', ['$scope','Constantes','$location','autenticacionService','DetalleBusquedaFactory','questionnaireService','navBar','solutionService',
		function($scope,Constantes,$location,autenticacionService,DetalleBusquedaFactory,questionnaireService,navBar,solutionService){                              	
      $scope.respuestas = [];      
      DetalleBusquedaFactory.get({"pk": autenticacionService.getIdBusqueda()}).$promise.then(function(datos){                                    
        console.log(datos);
        $scope.titulo = datos.titulo;
        $scope.descripcion = datos.descripcion;
        $scope.respuestas = datos.respuestas_asociadas;

          questionnaireService.setQuestionnaires(datos.cuestionario);
          $scope.questionnaires = questionnaireService.getQuestionnaires();                  
          console.log($scope.questionnaires);
          // for (var i = 0; i <= $scope.questionnaires.length-1; i++) {
          //   $scope.questionnaires[i].enable = true;  
          // }; 
          var cont = 0;               
          for(var k=0;k<$scope.questionnaires.length;k++)
          {  
            $scope.questionnaires[k].enable=true;
            for(var i=0; i<$scope.questionnaires[k].preguntas.length;i++)
            { 
              cont = 0; 
              for(var j=0;j<$scope.questionnaires[k].preguntas[i].pregunta.opciones.length;j++)
              {                
                if ($scope.questionnaires[k].preguntas[i].pregunta.opciones[j].dato === 0) {
                  
                  // $scope.questionnaires[k].preguntas[i].dato = $scope.questionnaires[k].preguntas[i].pregunta.opciones[j].dato;
                } else{
                  cont++;
                  // $scope.questionnaires[k].preguntas[i].pregunta.opciones[j].dato === 0;                  
                };                
              }            
              if (cont > 0) {     
                $scope.questionnaires[k].preguntas[i].enable=true;             
              } else{
                $scope.questionnaires[k].preguntas[i].enable=false;             
              };
            } 
          }    
        console.log($scope.questionnaires);
      }).catch(function(error){
        console.log(error);
      });

      $scope.detalle = function(_id,_index){                      
            // $scope.solution = $scope.solutions[parseInt(_id)];
            // solutionService.setSolution($scope.solution);            
            solutionService.setId(_id);
            solutionService.setIndex(_index);            
            $location.path('/solutions/detail');                               
      }

      $scope.toggleRight = function(){                                
        navBar.open();
      }

      $scope.close= function(){
        navBar.close();
      }

      $scope.menu_bar = function (view){
        questionnaireService.changeView(view);                      
      }
      
      $scope.logout = function(){
        // Falta llamar ruta de logout
        $location.path('/signin');
      } 
		}
	]);
})();