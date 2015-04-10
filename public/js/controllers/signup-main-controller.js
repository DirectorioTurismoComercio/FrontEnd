(function(){
	/**
	*  Module
	*
	* Description
	*/
	angular.module('gemStore')
	.controller('SignupMainController', ['$scope', 'registroService', function($scope,registroService){
	$scope.redes = [{"id":1,"nombre":"Facebook","icono":""},{"id":2,"nombre":"Twitter","icono":""}];
    
	 $scope.changeView = function (view)
        {
        	registroService.changeView(view);
        }	
        $scope.usuario =  registroService.getUsuario();
        $scope.usuarioredes = registroService.getUsuarioRedes();
         $scope.getRedById=function(id)
    {
        var longitud=0;
        if($scope.redes)
        {
            longitud=$scope.redes.length;
        }
    
        var i;
        for(i=0;i<longitud;i++)
        {
            if($scope.redes[i].id==id)
                return $scope.redes[i];
        }    
        return -1;
    }

	}]);
})();