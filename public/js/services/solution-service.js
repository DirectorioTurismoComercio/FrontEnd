(function(){
	angular.module('gemStore')	
	.service('solutionService', ['$resource','SolutionFactory','$location',
	function($resource,SolutionFactory,$location) {
	var solutions = null;
	var getSolutions = function ()
	{
		return solutions;
	}
	var setSolutions = function (_solutions)
	{
		solutions = _solutions;
		console.log(solutions);
	}
	 return {

	 	solutions: solutions,
	 	getSolutions: getSolutions,
	 	setSolutions: setSolutions	  	
	  };

	}]);
})();	
