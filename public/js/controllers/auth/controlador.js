(function(){
	angular.module('gemStore')
	.service('autenticacionService', ['$resource','$location','AuthFactory',
	function($resource,$location,AuthFactory) {
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
