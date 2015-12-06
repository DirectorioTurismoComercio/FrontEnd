(function(angular){
'use strict';

/**
 * @ngdoc directive
 * @name myapp.directive:myDirective
 * @restrict EA
 * @scope
 * @param {String} param1 This is the parameter1 description
 * @param {String=} param2 This is the parameter2 description. 
 *                         	THis is an optional parameter
 *
 * @description
 * This displays the selected item
 *
 * @example
   <example module="mydirectivesample">
     <file name="index.html">
	     <div ng-controller="SampleCtrl">
	     	  Value1: <input type="text" ng-model="value1" /> <br/>
	     	  Value2: <input type="text" ng-model="value2" /> <br/>
	         <my-directive param1="value1" 
	         	param2="{{value2}}">
	         </my-directive>
	      </div>
     </file>
     <file name="script.js">
     	angular.module("mydirectivesample", ["myapp"])
     		.controller("SampleCtrl",["$scope", 
	     		function($scope){
					 $scope.value1="sample";
	     		}]);
     </file>
   </example>
 */
	angular.module('myapp')
		.directive('myDirective', [function () {
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