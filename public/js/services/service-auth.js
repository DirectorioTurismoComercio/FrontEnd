(function(){
	angular.module('gemStore')
	.service('autenticacionService', ['$resource','$location',
	function($resource,$location) {
      		var info = "";
      		var user = {};

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

			return {
	  			getInfo: getInfo,
	    		setInfo: setInfo,
	    		getUser: getUser,
	    		setUser: setUser
			}
		}
	]);

})();
