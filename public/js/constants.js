var objeto = {
        "url": "http://innovamarca.com.co/servicio2",
        "login": "/rest-auth/login/",
        "logout": "/rest-auth/logout/",
        "user": "/rest-auth/registration/",
        "user_detail": "/rest-auth/user/",
        "sitios":"/ruta/sitios",
        "sitio":"/sitio",
        "siteDetail":"/sitio/detail/",
        "new_password":"/rest-auth/password/change/",
        "categorias":"/categorias",
        "getTownOnMapClickURL":'http://maps.googleapis.com/maps/api/geocode/json?latlng=',
        "getMunicipalitySites":"/municipio/sitios",
        "createRoute":'/ruta/crear',
        "updateRoute":'/ruta/actualizar/',
        "timeout":120000
    }




angular.module('constants', [])
    .constant("API_CONFIG", objeto);
