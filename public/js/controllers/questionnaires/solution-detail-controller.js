angular.module('gemStore')
.controller('SolutionDetailController', ['$scope','Constantes','SolutionFactory','solutionService', '$location',
	function($scope,Constantes,SolutionFactory,solutionService, $location){
                //Rutas Imagenes
                $scope.ruta = Constantes.ruta_imagenes + "botones/";                        
                $scope.img = $scope.ruta + 'icono-comenzar.png';
                promesa = SolutionFactory.query().$promise.
          then(function(solutions){                
                solutionService.setSolutions(solutions);
                $scope.solutions=solutionService.getSolutions();                
        })
        .catch(function(errors){
          console.log(errors);
        })
        .finally(function(){
          console.log("in finally");
        });

        $scope.detalle = function(_id){
                $location.path('/solutions/detail');
        }
}]);