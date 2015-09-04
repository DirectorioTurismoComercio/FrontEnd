(function(){
	angular.module('gemStore')
	.controller('ActionQuestionnaireController', ['$scope','Constantes','questionnaireService',
		function($scope,Constantes,questionnaireService){
                        //Rutas Imagenes
                        $scope.ruta = Constantes.ruta_imagenes + "botones/";
                        $scope.busco = $scope.ruta + "boton-busco.png";
                        $scope.ofrezco = $scope.ruta + "boton-ofrezco.png";
			console.log('Prueba Controlador');
			$scope.changeView = function (tipo)
        	{    
        		console.log(tipo);
        		if (tipo == 'V') {
        			questionnaireService.setTipo(null);
        			questionnaireService.changeView('signin');        		
        		} 
        		else{
        			questionnaireService.setTipo(tipo);    
                                console.log(questionnaireService.getTipo());    		
			        questionnaireService.changeView('rolquestionnaire');        		
        		};  
        	}	
		}
	]);

})();