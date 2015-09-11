(function(){
	angular.module('gemStore')
	.controller('ActionQuestionnaireController', ['$scope','Constantes','questionnaireService','navBar',
		function($scope,Constantes,questionnaireService,navBar){
                        //Rutas Imagenes
                        $scope.ruta = Constantes.ruta_imagenes + "botones/";
                        $scope.busco = $scope.ruta + "boton-busco.png";
                        $scope.ofrezco = $scope.ruta + "boton-ofrezco.png";
			console.log('Prueba Controlador');                        

                        $scope.toggleRight = function(){                                
                                navBar.open();
                        }

                        $scope.close= function(){
                                navBar.close();
                        }

                        $scope.menu_bar = function (view){
                                questionnaireService.changeView(view);                      
                        }

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