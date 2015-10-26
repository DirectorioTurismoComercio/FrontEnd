(function(){
	angular.module('gemStore')
	.service('autenticacionService', ['$resource','$location',
	function($resource,$location) {
      		var info = "";

      		var getInfo = function ()
			{
				return info;
			}

			var setInfo = function (_info)
			{
				info = _info;
			}

			return {
	  			getInfo: getInfo,
	    		setInfo: setInfo
			}
		}
	]);

})();
