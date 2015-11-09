(function(){
	angular.module('gemStore')
	.controller('ProfileSearchDetailController', ['$scope','Constantes','$location','autenticacionService','DetalleBusquedaFactory','questionnaireService','navBar','solutionService','LogoutFactory',
		function($scope,Constantes,$location,autenticacionService,DetalleBusquedaFactory,questionnaireService,navBar,solutionService,LogoutFactory){                              	
      $scope.respuestas = [];      
      DetalleBusquedaFactory.get({"pk": autenticacionService.getIdBusqueda()}).$promise.then(function(datos){                                    
        console.log(datos);
        $scope.titulo = datos.titulo;
        $scope.descripcion = datos.descripcion;        
        $scope.respuestas = datos.respuestas_asociadas;
        solutionService.setSolutions(datos.respuestas_asociadas);

        questionnaireService.setQuestionnaires(datos.cuestionario);
        questionnaireService.setTipo(datos.tipo);
        $scope.questionnaires = questionnaireService.getQuestionnaires();                            
        console.log($scope.questionnaires);          
        var cont = 0;                         
        for(var k=0;k<$scope.questionnaires.length;k++)
        {  
          $scope.questionnaires[k].enable=true;
          for(var i=0; i<$scope.questionnaires[k].preguntas.length;i++) //Loop Preguntas
          { 
            switch($scope.questionnaires[k].preguntas[i].pregunta.tipo_pregunta){
              case 'U':
                if ($scope.questionnaires[k].preguntas[i].pregunta.dato === 0 ) {
                  $scope.questionnaires[k].preguntas[i].enable = false;
                } else{
                  $scope.questionnaires[k].preguntas[i].enable = true;
                };                    
                break;
              case 'L':
                if ($scope.questionnaires[k].preguntas[i].pregunta.dato === 0 ) {
                    $scope.questionnaires[k].preguntas[i].enable = false;
                } else{
                    $scope.questionnaires[k].preguntas[i].enable = true;
                };                    
                break;
              case 'M':
                cont = 0;
                for(var j=0;j<$scope.questionnaires[k].preguntas[i].pregunta.opciones.length;j++)
                { 
                  if ($scope.questionnaires[k].preguntas[i].pregunta.opciones[j].dato === 1) 
                  {
                    $scope.questionnaires[k].preguntas[i].pregunta.opciones[j].dato = true;
                    cont++;
                  } else{
                    $scope.questionnaires[k].preguntas[i].pregunta.opciones[j].dato = false;                      
                  };
                }
                if (cont > 0) {     
                  $scope.questionnaires[k].preguntas[i].enable = true;             
                } else{
                              
                };
                break;
            }             
          }
        }  
        console.log($scope.questionnaires);
      }).catch(function(error){
        console.log(error);
      });

      $scope.detalle = function(_id,_index){                                              
            solutionService.setId(_id);
            solutionService.setIndex(_index);         
            solutionService.setLogged('YES');
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
            LogoutFactory.logear(autenticacionService.getInfo()).save().$promise.then(function(respuesta){                                                                                       
                  console.log(respuesta);   
              autenticacionService.setInfo('');                                  
              $location.path('/signin');
            }).catch(function(error){
              console.log(error);            
            });         
      } 
		}
	]);
})();