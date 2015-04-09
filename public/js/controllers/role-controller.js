(function(){
	angular.module('gemStore')
	.controller('RoleController', ['$scope', 'registroService', function($scope,registroService){
		$scope.titulo = "Pagina Principal Controller";
		$scope.roles = [
		    {src: './images/RegistroRolComerciante.png', des: 'Imagen 01'},
		    {src: './images/RegistroRolEmpresario.png',  des: 'Imagen 02'},
		    {src: './images/RegistroRolInstitucion.png', des: 'Imagen 03'},
		    {src: './images/RegistroRolUniversidad.png', des: 'Imagen 04'},
		    {src: './images/RegistroRolUniversidad.png', des: 'Imagen 04'},
		    {src: './images/RegistroRolUniversidad.png', des: 'Imagen 04'}
		];

		$scope.verDescription = true;
        $scope.changeView = function (view)
        {
        	registroService.changeView(view);
        }	
        $scope.usuario =  registroService.getUsuario();
		$scope.toggleDescription = function(index) {
			$scope.verDescription = $scope.verDescription === false ? true : false;
			$scope.rol_seleccionado = $scope.roles[index];
		}

	}]);
})();