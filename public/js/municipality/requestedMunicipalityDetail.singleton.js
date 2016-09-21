angular.module('Municipality')
    .service('requestedMunicipalityDetail', function () {
        this.municipality = {};

        function getMunicipality() {
            return this.municipality;
        }

        function setMunicipality(municipality) {
            this.municipality = municipality;
        }

        return {
            setMunicipality: setMunicipality,
            getMunicipality: getMunicipality
        };
    });
