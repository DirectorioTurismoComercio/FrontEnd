angular.module('Municipality').filter('searchMunicipality', function () {
    return function (groups, search) {
        var searchText = (search.text || "").toLowerCase();
        search.areThereResults = false;

        angular.forEach(groups, function (group) {
            group.visible = false;

            angular.forEach(group.municipalities, function (municipality) {
                if (municipality.nombre.toLowerCase().indexOf(searchText) !== -1) {
                    municipality.visible = true;
                    group.visible = true;
                    search.areThereResults = true;
                } else {
                    municipality.visible = false;
                }
            });
        });

        return groups;
    };
});