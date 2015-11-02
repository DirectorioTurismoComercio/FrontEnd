(function(){
	angular.module('gemStore')
	.controller('ProfileSearchDetailController', ['$scope','Constantes','$location','autenticacionService','DetalleBusquedaFactory','questionnaireService',
		function($scope,Constantes,$location,autenticacionService,DetalleBusquedaFactory,questionnaireService){                              	
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
		}
	]);
})();