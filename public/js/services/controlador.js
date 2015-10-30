(function(){
	angular.module('gemStore')
	.service('AuthService', ['$scope','Constantes','AuthFactory',
		function($scope,Constantes,AuthFactory){                        
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
	  			setInfo: setInfo,
	    		getInfo: getInfo
			}
		}
	]);

})();
