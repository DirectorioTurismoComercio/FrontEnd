angular.module('gemStore')
.controller('SolutionController', ['$scope','Constantes','SolutionFactory','solutionService', '$location',
	function($scope,Constantes,SolutionFactory,solutionService, $location){
        //Rutas Imagenes
        $scope.ruta = Constantes.ruta_imagenes + "botones/";                        
        $scope.img = $scope.ruta + 'icono-comenzar.png';
        $scope.detail = false;
        $scope.id = null;
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
                // $location.path('/solutions/detail');
                if ($scope.id === _id) {
                    $scope.id = null;    
                }
                else {
                    $scope.id = _id;                                
                };
                
        }
}]);