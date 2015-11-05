(function(){
	angular.module('gemStore')
	.service('autenticacionService', ['$resource','$location',
	function($resource,$location) {
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

			return {
	  			getInfo: getInfo,
	    		setInfo: setInfo,
	    		getUser: getUser,
	    		setUser: setUser,
	    		getIdBusqueda: getIdBusqueda,
	    		setIdBusqueda: setIdBusqueda
			}
		}
	]);

})();
