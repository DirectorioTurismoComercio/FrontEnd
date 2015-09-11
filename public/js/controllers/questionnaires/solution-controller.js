angular.module('gemStore')
.controller('SolutionController', ['$scope','Constantes','SolutionFactory','solutionService', '$location', 'questionnaireService', 'navBar',
	function($scope,Constantes,SolutionFactory,solutionService, $location, questionnaireService, navBar){
        //Rutas Imagenes
        window.scrollTo(0, 1);
        $scope.ruta = Constantes.ruta_imagenes + "botones/";                        
        $scope.img = $scope.ruta + 'icono-comenzar.png';
        $scope.img2 = $scope.ruta + 'icono-registro.png';
        $scope.detail = false;
        $scope.id = null;
        $scope.load = true;

        $scope.toggleRight = function(){                                
          navBar.open();
        }

        $scope.close= function(){
          navBar.close();
        }

        $scope.menu_bar = function (view){
          questionnaireService.changeView(view);                      
        }
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
          $scope.load = false;
        });

        $scope.detalle = function(_id){            
            $scope.solution = $scope.solutions[parseInt(_id)];
            solutionService.setSolution($scope.solution);
            $location.path('/solutions/detail');                               
        }

        $scope.reg = function(){           
        console.log('HOOA')             ;
            $location.path('personalData');                               
        }
}]);