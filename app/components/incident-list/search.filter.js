(function () {

    'use strict';

    angular
        .module('mapApp')
        .filter('searchFilter', searchFilter);

    function searchFilter() {

        return function (incidents, search) {
            return incidents.filter(function (incident) {
                return incident.Клиент == search;
            });
        }
    }
})();
