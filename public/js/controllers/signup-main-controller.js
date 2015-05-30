(function(){
    /**
    *  Module
    *
    * Description
    */
    angular.module('gemStore')
    .controller('SignupMainController',['$scope', 'registroService',
        function($scope,registroService){
            //TODO: estas redes "hard coded" se corregiran en la tarea 354
            $scope.redes = [{"id":1,"nombre":"Facebook","icono":""},
                            {"id":2,"nombre":"Twitter","icono":""}];

            $scope.changeView  = function (view){
                                    registroService.changeView(view);
                                };

            $scope.usuario      = registroService.getUsuario();
            $scope.usuarioRedes = registroService.getUsuarioRedes();
            $scope.getRedById = function(id)
                                {
                                    var longitud=0;
                                    if($scope.redes)
                                    {
                                        longitud=$scope.redes.length;
                                    }
                                    var i;
                                    for(i=0;i<longitud;i++)
                                    {
                                        if($scope.redes[i].id==id)
                                            return $scope.redes[i];
                                    }
                                    return -1;
                                };
            $scope.save = function(user) {
                //TODO: este user.rol = 1 se corregira en la tarea 350
                user.$save()
                .then(function(user){
                    // TODO: post de redes en JSON y no en array se resolvera en la tarea 346
                    //
                    // $location.path("/users/"+user.id);
                    // console.log("Objeto retornado por el POST",user);
                    // userNetworks = angular.copy($scope.usuarioRedes);
                    // console.log(userNetworks);
                    // debugger;
                    // for (var i = userNetworks.length - 1; i >= 0; i--) {
                    //     console.log("userNetworks[i]:",userNetworks[i]);
                    //     userNetworks[i].usuario = user.id;
                    //     console.log("userNetworks["+i+"]",userNetworks[i]);
                    // };
                }).catch(function(errors){
                    console.log("Errores retornado por el POST de agregar usuario",errors);
                }).finally(function(){
                    $scope.isSubmitting = false;
                    registroService.changeView('user/'+user.id);
                });
                scope = {}
        };
    }]);
})();