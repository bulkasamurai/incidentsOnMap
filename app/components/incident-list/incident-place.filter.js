(function () {

    'use strict';

    angular
        .module('mapApp')
        .filter('incidentPlace', incidentPlace);

    function incidentPlace() {

        return function (incidents, filterPlace) {
            return incidents.filter(filterPlace);
        }
    }
})();