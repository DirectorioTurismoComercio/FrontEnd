/**
* UserAdminController Module
*
* to redirect to edit user, create problems, complete social networks
*/
angular.module('gemStore')
.controller('UserAdminController', function($scope,$routeParams){
	console.log("$routeParams.idUser",$routeParams.idUser);
	$scope.idUser = $routeParams.idUser;
});