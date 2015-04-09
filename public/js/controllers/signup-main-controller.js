(function(){
	/**
	*  Module
	*
	* Description
	*/
	angular.module('gemStore')
	.controller('SignupMainController', ['$scope', 'registroService', function($scope,registroService){
	
	 $scope.changeView = function (view)
        {
        	registroService.changeView(view);
        }	
        $scope.usuario =  registroService.getUsuario();

	}]);
})();