(function(){
	angular.module('gemStore')
	.controller('ProfileMainController', ['$scope','Constantes','$location','questionnaireService','navBar','$mdToast','LogoutFactory','authenticationService','solutionService','RoleFactory',
		function($scope,Constantes,$location,questionnaireService,navBar,$mdToast,LogoutFactory,authenticationService,solutionService,RoleFactory){                              	
      $scope.usuario = authenticationService.getUser();
      $scope.rol = $scope.usuario.rol;
      questionnaireService.setRol($scope.rol);

      var roleFactory     = new RoleFactory();
      console.log("rol factory"+roleFactory);
      RoleFactory.get({'id': $scope.rol}).$promise 
      .then(function(inforol){
        console.log(inforol);
        questionnaireService.setImgRol(inforol.imagen);
        $scope.img_rol = Constantes.ruta_imagenes + '/' + questionnaireService.getImgRol();

        if (inforol.tipo_rol === 'BC' || inforol.tipo_rol === 'BC') {
          questionnaireService.setTipo('P');
        } else{
          questionnaireService.setTipo('S');
        };
        console.log(questionnaireService.getTipo());
      }).catch(function(errors){
        console.log("Error al recuperar los roles desde el servidor: ",errors);
      }).finally(function(){
        
      });

      $scope.ruta = Constantes.ruta_imagenes + "botones/";
      $scope.perfil= $scope.ruta + "boton_registrate.png";    
      $scope.conectar= $scope.ruta + "boton-conectarse.png";    
      $scope.buscar= $scope.ruta + "boton_agregar_busqueda.png";    
      $scope.inicio= $scope.ruta + "boton-comenzar.png";          
      solutionService.setLogged('NOT');

      $scope.menu_bar = function (view){
        questionnaireService.changeView(view);                      
      }
      
      $scope.profile = function(){
        $location.path('/profileUpdate');
      } 

      $scope.conexiones = function(){
        $location.path('/profileConections');
      } 

      $scope.busquedas = function(){
        $location.path('/profileSearch');
      } 

      $scope.new_b = function(){
        $location.path('/questionnaires');
      } 

		}
	]);
})();