(function(angular){
'use strict';

/**
 * @ngdoc directive
 * @name myapp.directive:myDirective2
 * @restrict EA
 * @scope
 * @param {String} param1 This is the parameter1 description
 * @param {String=} param2 This is the parameter2 description. 
 *                         	THis is an optional parameter
 *
 * @description
 * Esta descripción genera el proceso de kasdjdañsdñsakñk
 * 
 */
	angular.module('myapp')
		.directive('myDirective2', [function () {
			function linkFn(scope){

			}
			return {
				restrict: 'EA',
				scope: {
					param1: '=',
					param2: '@?'
				},
				templateUrl: 'partials/directive.tpl.html',
				link: linkFn
			};

		}]);
})(angular);