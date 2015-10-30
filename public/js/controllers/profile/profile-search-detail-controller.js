(function(){
	angular.module('gemStore')
	.controller('ProfileSearchDetailController', ['$scope','Constantes','$location','autenticacionService','DetalleBusquedaFactory','questionnaireService',
		function($scope,Constantes,$location,autenticacionService,DetalleBusquedaFactory,questionnaireService){                              	
      $scope.detalle = [];
      DetalleBusquedaFactory.get({"pk": '151'}).$promise.then(function(datos){                                    
          questionnaireService.setQuestionnaires(datos.cuestionario);
          $scope.questionnaires = questionnaireService.getQuestionnaires();                  
        console.log($scope.questionnaires);
      }).catch(function(error){
        console.log(error);
      });
		}
	]);
})();