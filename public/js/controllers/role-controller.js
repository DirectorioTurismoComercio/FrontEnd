(function(){
	angular.module('gemStore')
	.controller('RoleController', ['$scope', function($scope){
		$scope.titulo = "Pagina Principal Controller";
		$scope.overlayTitle = "Selecciona tu rol dentro de la plataforma";
		$scope.roles = [
		    {src: './images/RegistroRolComerciante.png', des: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut venenatis a leo vitae auctor. Donec vel posuere dolor. Integer sed semper tellus. Sed ultrices nibh id nisl malesuada, eu fringilla mi tincidunt. 01', titulo: 'titulo', rol: 'Comerciante' },
		    {src: './images/RegistroRolEmpresario.png',  des: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut venenatis a leo vitae auctor. Donec vel posuere dolor. Integer sed semper tellus. Sed ultrices nibh id nisl malesuada, eu fringilla mi tincidunt. 02', titulo: 'titulo', rol: 'Empresario'},
		    {src: './images/RegistroRolInstitucion.png', des: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut venenatis a leo vitae auctor. Donec vel posuere dolor. Integer sed semper tellus. Sed ultrices nibh id nisl malesuada, eu fringilla mi tincidunt. 03', titulo: 'titulo', rol: 'Institución'},
		    {src: './images/RegistroRolUniversidad.png', des: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut venenatis a leo vitae auctor. Donec vel posuere dolor. Integer sed semper tellus. Sed ultrices nibh id nisl malesuada, eu fringilla mi tincidunt. 04', titulo: 'titulo', rol: 'Universidad'}
		];

		$scope.verDescription = true;

		$scope.toggleDescription = function(index) {
			$scope.verDescription = $scope.verDescription === false ? true : false;
			$scope.rol_seleccionado = $scope.roles[index];
		}

	}]);
})();