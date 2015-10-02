(function(){
	angular.module('gemStore')
	.controller('SolutionController', ['$scope','Constantes','SolutionFactory','solutionService',
		function($scope,Constantes,SolutionFactory,solutionService){
                        //Rutas Imagenes
                        $scope.ruta = Constantes.ruta_imagenes + "botones/";                        
	}
	]);

})();