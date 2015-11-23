(function(){
	angular.module('gemStore')	
	.service('conexionService', ['$resource','$location',
	function($resource,$location) {	
	var busq = null;
	var origen = null;
	var solu = {};

	var getBusqueda = function ()
	{
		return busq;
	}
	var setBusqueda = function (_busq)
	{
		busq = _busq;				
	}

	var getSolucion = function ()
	{
		return solu;
	}
	var setSolucion = function (_solu)
	{
		solu = _solu;				
	}

	var setOrigen = function (_origen)
	{
		origen = _origen;				
	}

	var getOrigen = function ()
	{
		return origen;				
	}

	 return {
	 	getBusqueda: getBusqueda,
	 	setBusqueda: setBusqueda,	  	  		  		  		  	
	 	getSolucion: getSolucion,
	 	setSolucion: setSolucion,
	 	getOrigen: getOrigen,
	 	setOrigen: setOrigen
	  };

	}]);
})();	
