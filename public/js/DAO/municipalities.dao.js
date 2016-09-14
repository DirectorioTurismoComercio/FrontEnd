angular.module('dao')
    .service('MunicipalitiesDAO', function ($resource, API_CONFIG) {

        function getAllMunicipalities() {
            return $resource(API_CONFIG.url + "/sitio/municipios").query().$promise;
        }

        return {
            getAllMunicipalities: getAllMunicipalities
        }
    });
