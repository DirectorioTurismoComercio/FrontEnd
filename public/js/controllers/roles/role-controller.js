angular.module('gemStore')
	.controller('RoleController', ['$scope', 'registroService', 'RoleFactory','Constantes','$mdDialog',
		function($scope,registroService,RoleFactory,Constantes,$mdDialog){
		$scope.titulo       = "Pagina Principal Controller";
		$scope.overlayTitle = "Define tu rol dentro de la plataforma";
		$scope.ruta         = Constantes.ruta_imagenes;
		$scope.ruta2        = Constantes.ruta_imagenes + "botones/";    
		$scope.load = true;
		var roleFactory     = new RoleFactory();
		console.log("rol factory"+roleFactory);

		tipo_rol = Constantes.app;
        RoleFactory.query({'tipo_rol': tipo_rol}).$promise 
        .then(function(roles){
	        	$scope.roles = roles;
            }).catch(function(errors){
                console.log("Error al recuperar los roles desde el servidor: ",errors);
            }).finally(function(){
               $scope.load = false;     
               console.log($scope.load);
            });
        
		$scope.verDescription = true;

		$scope.roleSelect = function(index){			
			$scope.rol_seleccionado = $scope.roles[index];		
			registroService.getUsuario().rol=$scope.roles[index].id;
            $mdDialog.show({
            	locals:{dataToPass: $scope.rol_seleccionado, ruta: $scope.ruta},                
            	clickOutsideToClose: true,                            	
            	templateUrl: 'templates/signup/role-popup.html',
            	controller: ['$scope', 'dataToPass', '$mdDialog', 'ruta', function($scope, dataToPass, $mdDialog, ruta) { 
				    $scope.dataToPass = dataToPass;
				    $scope.ruta = ruta;
				    $scope.hide = function() {
						$mdDialog.hide();
					};
					$scope.cancel = function() {
						$mdDialog.cancel();
					};  
					$scope.answer = function() {    					    
					    $mdDialog.hide();
					    registroService.changeView('personalData');					    
					};
				}]
        });

		var mdDialogCtrl = function ($scope, dataToPass) { 
    		$scope.mdDialogData = dataToPass  
		}        

        }

		$scope.changeView = function (view)
        {
        	registroService.changeView(view);
        }	

 		$scope.usuario =  registroService.getUsuario();
		$scope.toggleDescription    = function(index) {
			$scope.verDescription   = $scope.verDescription === false ? true : false;
			$scope.rol_seleccionado = $scope.roles[index];
			registroService.getUsuario().rol=$scope.roles[index].id;
		}

}]);

// function DialogController($scope, $mdDialog, rol) {
// 	$scope.save = false;
// 	$scope.rol_seleccionado = rol;	
// 	console.log(rol);
// 	$scope.hide = function() {
// 		$mdDialog.hide();
// 	};
// 	$scope.cancel = function() {
// 		$mdDialog.cancel();
// 	};  
// }