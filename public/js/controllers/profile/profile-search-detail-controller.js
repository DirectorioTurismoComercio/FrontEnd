(function(){
	angular.module('gemStore')
	.controller('ProfileSearchDetailController', ['$scope','Constantes','$location','autenticacionService','DetalleBusquedaFactory','questionnaireService','navBar',
		function($scope,Constantes,$location,autenticacionService,DetalleBusquedaFactory,questionnaireService,navBar){                              	
      $scope.detalle = [];
      DetalleBusquedaFactory.get({"pk": autenticacionService.getIdBusqueda()}).$promise.then(function(datos){                                    
        console.log(datos);
          questionnaireService.setQuestionnaires(datos.cuestionario);
          $scope.questionnaires = questionnaireService.getQuestionnaires();                  
          console.log($scope.questionnaires);
          // $scope.questionnaires[0].enable = true;
        console.log($scope.questionnaires);
      }).catch(function(error){
        console.log(error);
      });

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