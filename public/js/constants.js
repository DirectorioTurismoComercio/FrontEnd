var objeto = {
    "login": "/rest-auth/login/",
    "logout": "/rest-auth/logout/",
    "user": "/rest-auth/registration/",
    "password_reset": "/rest-auth/password/reset/",
    "confirm_password_reset": '/rest-auth/password/reset/confirm/',
    "user_detail": "/rest-auth/user/",
    "sitios": "/ruta/sitios",
    "sitio": "/sitio",
    "siteDetail": "/sitio/detail/",
    "new_password": "/rest-auth/password/change/",
    "categorias": "/categorias",
    "getTownOnMapClickURL": 'http://maps.googleapis.com/maps/api/geocode/json?latlng=',
    "getMunicipalitySites": "/municipio/sitios",
    "createRoute": '/ruta/crear',
    "updateRoute": '/ruta/actualizar/',
    'rate': '/calificacion',
    "timeout": 120000,
    "photosLimitNumber": 3
};


angular.module('constants', [])
    .constant("API_CONFIG", objeto).constant('$clamp', $clamp);
