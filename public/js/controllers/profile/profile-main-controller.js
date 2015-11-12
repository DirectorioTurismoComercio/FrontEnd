(function(){
	angular.module('gemStore')
	.controller('ProfileMainController', ['$scope','Constantes','$location','questionnaireService','navBar','$mdToast','LogoutFactory','autenticacionService',
		function($scope,Constantes,$location,questionnaireService,navBar,$mdToast,LogoutFactory,autenticacionService){                              	
      var last = {
        bottom: false,
        top: true,
        left: false,
        right: true
      };
      $scope.toastPosition = angular.extend({},last);
      $scope.getToastPosition = function() {    
        return Object.keys($scope.toastPosition)
        .filter(function(pos) { return $scope.toastPosition[pos]; })
        .join(' ');
      };  
      $scope.openToast = function($event) {
        $mdToast.show(
          $mdToast.simple().content('Simple Toast!')        
          .position($scope.getToastPosition())
          .hideDelay(1000)
        );
      };
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
        LogoutFactory.logear(autenticacionService.getInfo()).save().$promise.then(function(respuesta){                                                                                       
          console.log(respuesta);   
          autenticacionService.setInfo('');                                  
          $location.path('/signin');
        }).catch(function(error){
          console.log(error);            
        });         
      } 
		}
	]);
})();