
(function(){
	angular.module('gemStore')
	.controller('ActionQuestionnaireController', ['$scope','Constantes','questionnaireService',
		function($scope,Constantes,questionnaireService){
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
					questionnaireService.changeView('rolquestionnaire');        		
        		};  
        	}	
		}
	]);

})();