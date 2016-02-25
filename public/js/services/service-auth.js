(function(){
	angular.module('gemStore')
	.service('autenticacionService', ['$resource','$location', 'LogoutFactory','$route',
	function($resource,$location, LogoutFactory, $route) {
      		var info = "";
      		var user = {};
      		var id_busqueda = "";

      		var getInfo = function ()
			{
				return info;
			}

			var setInfo = function (_info)
			{
				info = _info;
			}

			var getUser = function ()
			{
				return user;
			}

			var setUser = function (_user)
			{
				user = _user;				
			}

			var getIdBusqueda = function ()
			{
				return id_busqueda;
			}

			var setIdBusqueda = function (_idbusq)
			{
				id_busqueda = _idbusq;				
			}

			var isUserAuthenticated = function()
			{
				return !(user.id === undefined);
			}

			var logout = function(){
				user.id=undefined;
				LogoutFactory.logout(getInfo()).save().$promise.then(function(respuesta){
					setInfo('');
					$location.path('/signin');
				}).catch(function(error){
				});
			}

		return {
	  			getInfo: getInfo,
	    		setInfo: setInfo,
	    		getUser: getUser,
	    		setUser: setUser,
	    		getIdBusqueda: getIdBusqueda,
	    		setIdBusqueda: setIdBusqueda,
	    		isUserAuthenticated: isUserAuthenticated,
				logout:logout
			}
		}
	]);

})();
