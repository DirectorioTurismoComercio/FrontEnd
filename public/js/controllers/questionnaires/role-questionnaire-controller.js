
(function(){
	angular.module('gemStore')
	.controller('RoleQuestionnaireController', ['$scope', 'registroService', 'RoleFactory','Constantes','questionnaireService',
		function($scope,registroService,RoleFactory,Constantes,questionnaireService){
		$scope.titulo       = "Pagina Principal Controller";
		$scope.overlayTitle = "Define tu rol dentro de la plataforma";
		$scope.ruta         = Constantes.ruta_imagenes;
		
		var roleFactory     = new RoleFactory();
		console.log("rol factory"+roleFactory);

        RoleFactory.query().$promise 
        .then(function(roles){
	        	$scope.roles = roles;
	        	console.log($scope.roles);
            }).catch(function(errors){
                console.log("Error al recuperar los roles desde el servidor: ",errors);
            }).finally(function(){
               
            });
        
		$scope.verDescription = true;

		$scope.changeView = function (view)
        {	
        	console.log(view);
        	registroService.changeView(view);
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

 		$scope.usuario =  registroService.getUsuario();
		$scope.toggleDescription    = function(index) {
			$scope.verDescription   = $scope.verDescription === false ? true : false;
			$scope.rol_seleccionado = $scope.roles[index];			
			registroService.getUsuario().rol=$scope.roles[index].id;			
			questionnaireService.setRol($scope.roles[index].id);
			questionnaireService.setQuestionnaires(false);			
			questionnaireService.setConta(0);			
			questionnaireService.clearFull('ALL');						
		}

	}]);

})();