(function () {
    var register = angular.module('register', []);

    register.factory('registerService', ['UserFactory', 'registerResource', 'registerErrorHandler', function (UserFactory, registerResource, registerErrorHandler) {
        function checkRequireFields(userData) {
            if (userData.apellido1 == undefined || userData.municipio_id == undefined || userData.rol == undefined || userData.password == undefined) {
                registerErrorHandler.showError('fieldUndefined');
                throw Error("crendentials should contain username and password");
            }
        }

        return {
            register: function (userData) {
                checkRequireFields(userData);
                var newUser = new UserFactory();
                newUser = userData;
                return (registerResource.save(newUser) ? true : false);
            }
        }
    }]);

    register.service('registerResource', ['registerErrorHandler', function (registerErrorHandler) {
        return {
            save: function (newUser) {
                newUser.$save(function (data){
                        return true;
                    },
                    function (error){
                        console.log('An error has ocurred', error);
                        registerErrorHandler.showError(error);
                        return false;
                    });
            }
        }
    }]);

    register.service('registerErrorHandler',['$mdDialog', function($mdDialog){
        function createErrorMessage(message){
            $mdDialog.show(
                $mdDialog.alert()
                    .parent(angular.element(document.querySelector('#alertPop')))
                    .clickOutsideToClose(true)
                    .title('Error')
                    .content(message)
                    .ariaLabel('Alert Dialog Demo')
                    .ok('Aceptar')
                    .targetEvent('$event')
            );
        }

        return{
            showError: function(error){
                if(error=='fieldUndefined'){
                    createErrorMessage('Por favor seleccione un municipio');
                }

                if(error.status === 400){
                    createErrorMessage('El correo indicado ya existe, por favor cambielo e intentelo nuevamente.');
                }
            }
        }
    }]);

}())
