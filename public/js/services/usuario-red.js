/*
* Solo para 
*
*/
(function(){
	angular.module('gemStore')
	.factory('UsuarioRedFactory', ['$resource', 'Constantes',function($resource,Constantes) {
	return $resource(Constantes.url+'/usuariosredes/:id', null, {
    'update': {
      method: 'PUT',
    }
  	});
	}]);
})();