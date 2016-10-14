angular.module('dao')
    .service('UserDAO', function ($resource, $http, authenticationService, API_CONFIG) {

        function updateUser(user) {
            return $http.patch(API_CONFIG.url + API_CONFIG.user_detail, user, {
                headers: {'Authorization': 'Token ' + authenticationService.getUser().token}
            });
        }

        return {
            updateUser: updateUser
        }
    });
