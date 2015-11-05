(function(){
	angular.module('gemStore')
	.controller('ProfileMainController', ['$scope','Constantes','$location','questionnaireService','navBar',
		function($scope,Constantes,$location,questionnaireService,navBar){                              	

      $scope.toggleRight = function(){                                
        navBar.open();
      }

      $scope.close= function(){
        navBar.close();
      }

      $scope.menu_bar = function (view){
        questionnaireService.changeView(view);                      
      }
      
      $scope.profile = function(){
        $location.path('/profileUpdate');
      } 

      $scope.conexiones = function(){
        $location.path('/');
      } 

      $scope.busquedas = function(){
        $location.path('/profileSearch');
      } 

      $scope.new_b = function(){
        $location.path('/actionquestionnaire');
      } 

      $scope.logout = function(){
        // Falta llamar ruta de logout
        $location.path('/signin');
      } 
		}
	]);
})();