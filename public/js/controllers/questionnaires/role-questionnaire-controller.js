angular.module('gemStore')
	.controller('RoleQuestionnaireController', ['$scope', 'registroService', 'RoleFactory','Constantes','$mdDialog', 'questionnaireService',
		function($scope,registroService,RoleFactory,Constantes,$mdDialog,questionnaireService){
		$scope.titulo       = "Pagina Principal Controller";
		$scope.overlayTitle = "Define tu rol dentro de la plataforma";
		$scope.ruta         = Constantes.ruta_imagenes;
		$scope.ruta2 = Constantes.ruta_imagenes + "botones/";
		$scope.anterior = $scope.ruta2+'boton-regresar.png';
		$scope.load = true;
		var roleFactory     = new RoleFactory();
		console.log("rol factory"+roleFactory);
		var tipo = questionnaireService.getTipo();
		if (tipo === 'P') {
			tipo_rol = 'BC';
		} else{
			tipo_rol = 'O';
		};
		console.log(tipo_rol);
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
			$scope.usuario =  registroService.getUsuario();
			registroService.getUsuario().rol=$scope.roles[index].id;
			questionnaireService.setRol($scope.roles[index].id);
			questionnaireService.setQuestionnaires(false);			
			questionnaireService.setConta(0);			
			questionnaireService.clearFull('ALL');	
            $mdDialog.show({
            	locals:{dataToPass: $scope.rol_seleccionado, ruta: $scope.ruta},                
            	clickOutsideToClose: true,                            	
            	templateUrl: 'templates/questionnaires/role-popup.html',
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
					    registroService.changeView('questionnaires');					    
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
			$scope.usuario =  registroService.getUsuario();
			registroService.getUsuario().rol=$scope.roles[index].id;			
			questionnaireService.setRol($scope.roles[index].id);
			questionnaireService.setQuestionnaires(false);			
			questionnaireService.setConta(0);			
			questionnaireService.clearFull('ALL');						
		}

        $scope.oyb = function(dato){                	
 	      	type = questionnaireService.getTipo();        	
        	if (type == dato) {
        		return true;
        	} else{
				return false;	
        	};
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
// (function(){
// 	angular.module('gemStore')
// 	.controller('RoleQuestionnaireController', ['$scope', 'registroService', 'RoleFactory','Constantes','questionnaireService','navBar',
// 		function($scope,registroService,RoleFactory,Constantes,questionnaireService, navBar){
// 		$scope.titulo       = "Pagina Principal Controller";
// 		$scope.overlayTitle = "Define tu rol dentro de la plataforma";
// 		$scope.ruta         = Constantes.ruta_imagenes;
// 		$scope.load = true; 
// 		$scope.ruta2 = Constantes.ruta_imagenes + "botones/";
// 		$scope.anterior = $scope.ruta2+'boton-regresar.png';

// 		$scope.toggleRight = function(){                                
// 			navBar.open();
//         }

//         $scope.close= function(){
//         	navBar.close();
//         }

//         $scope.menu_bar = function (view){
// 			questionnaireService.changeView(view);                      
// 		}

// 		var roleFactory     = new RoleFactory();
// 		console.log("rol factory"+roleFactory);		
//         RoleFactory.query().$promise 
//         .then(function(roles){        	
// 	        	$scope.roles = roles;
// 	        	console.log($scope.roles);
//             }).catch(function(errors){
//                 console.log("Error al recuperar los roles desde el servidor: ",errors);
//             }).finally(function(){
//                $scope.load = false;               
//             });
        
// 		$scope.verDescription = true;

// 		$scope.changeView = function (view)
//         {	
//         	console.log(view);
//         	registroService.changeView(view);
//         }	
// //Ofreciendo buscando
//         $scope.oyb = function(dato){                	
//         	type = questionnaireService.getTipo();        	
//         	if (type == dato) {
//         		return true;
//         	} else{
// 				return false;	
//         	};
//         }

//  		$scope.usuario =  registroService.getUsuario();
// 		$scope.toggleDescription    = function(index) {
// 			$scope.verDescription   = $scope.verDescription === false ? true : false;
// 			$scope.rol_seleccionado = $scope.roles[index];			
// 			registroService.getUsuario().rol=$scope.roles[index].id;			
// 			questionnaireService.setRol($scope.roles[index].id);
// 			questionnaireService.setQuestionnaires(false);			
// 			questionnaireService.setConta(0);			
// 			questionnaireService.clearFull('ALL');						
// 		}

// 	}]);

// })();