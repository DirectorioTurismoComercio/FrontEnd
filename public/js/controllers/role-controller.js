
(function(){
	angular.module('gemStore')
	.controller('RoleController', ['$scope', 'registroService', 'RoleFactory','Constantes',
		function($scope,registroService,RoleFactory,Constantes){
		$scope.titulo = "Pagina Principal Controller";
		$scope.overlayTitle = "Define tu rol dentro de la plataforma";
		$scope.ruta=Constantes.ruta_imagenes;
         RoleFactory.query(function (roles){
	        	console.log(roles);
	        	$scope.roles = roles;
	        },function (error){
	        	console.log("Error.status", error.status);
	        });

        
		$scope.verDescription = true;
		$scope.changeView = function (view)
        {
        	registroService.changeView(view);
        }	
 		$scope.usuario =  registroService.getUsuario();
		$scope.toggleDescription = function(index) {
			$scope.verDescription = $scope.verDescription === false ? true : false;
			$scope.rol_seleccionado = $scope.roles[index];
			registroService.getUsuario().rol=$scope.roles[index].id;

		}

	}]);

})();