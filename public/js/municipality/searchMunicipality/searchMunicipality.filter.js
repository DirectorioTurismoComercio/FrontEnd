angular.module('Municipality').filter('searchMunicipality', function () {
    return function (groups, searchText) {
        searchText = (searchText || "").toLowerCase();

        angular.forEach(groups, function (group) {
            group.visible = false;

            angular.forEach(group.municipalities, function (municipality) {
                if (municipality.nombre.toLowerCase().indexOf(searchText) !== -1) {
                    municipality.visible = true;
                    group.visible = true;
                } else {
                    municipality.visible = false;
                }
            });
        });

        return groups;
    };
});