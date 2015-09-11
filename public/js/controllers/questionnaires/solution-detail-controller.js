angular.module('gemStore')
.controller('SolutionDetailController', ['$scope','Constantes','SolutionFactory','solutionService', '$location', 'questionnaireService', 'navBar',
	function($scope,Constantes,SolutionFactory,solutionService, $location, questionnaireService, navBar){
                //Rutas Imagenes
        $scope.ruta = Constantes.ruta_imagenes + "botones/";                        
        $scope.img1 = $scope.ruta + 'icono-registro.png';              
        $scope.solution = solutionService.getSolution();        
        $scope.questionnaires = questionnaireService.getQuestionnaires();
        console.log('Cuestionario',$scope.questionnaires);

        $scope.toggleRight = function(){                                
	      navBar.open();
	    }

	    $scope.close= function(){
	      navBar.close();
	    }

	    $scope.menu_bar = function (view){
	      questionnaireService.changeView(view);                      
	    }
}]);