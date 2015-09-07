angular.module('gemStore')
.controller('SolutionDetailController', ['$scope','Constantes','SolutionFactory','solutionService', '$location', 'questionnaireService',
	function($scope,Constantes,SolutionFactory,solutionService, $location, questionnaireService){
                //Rutas Imagenes
        $scope.ruta = Constantes.ruta_imagenes + "botones/";                        
        $scope.img1 = $scope.ruta + 'icono-registro.png';              
        $scope.solution = solutionService.getSolution();        
        $scope.questionnaires = questionnaireService.getQuestionnaires();
        console.log('Cuestionario',$scope.questionnaires);
}]);