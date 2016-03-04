(function () {
    var register = angular.module('register', []);

    register.service('registerResource', [function () {
        return {
            save: function (newUser) {
                newUser.$save().then(function (event) {
                    return true;
                }).catch(function (error) {
                    console.log('An error has ocurred', error);
                    return false;
                });
            }
        }
    }]);

    register.factory('registerService', ['UserFactory', '$mdDialog', 'registerResource', function (UserFactory, $mdDialog, registerResource) {
        function checkRequireFields(userData) {
            if (userData.apellido1 == undefined || userData.municipio_id == undefined || userData.rol == undefined || userData.password == undefined) {
                $mdDialog.show(
                    $mdDialog.alert()
                        .parent(angular.element(document.querySelector('#alertPop')))
                        .clickOutsideToClose(true)
                        .title('Error')
                        .content('Por favor seleccione un municipio')
                        .ariaLabel('Alert Dialog Demo')
                        .ok('Aceptar')
                        .targetEvent('$event')
                );
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
}())
