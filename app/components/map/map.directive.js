(function () {

    'use strict';

    angular
        .module('mapApp')
        .directive('map', googleMap);

    /* @ngInject */
    function googleMap() {
        return {
            controller: 'mapController',
            restrict: 'E',
            template: '<div id="map"></div>',
            replace: true
        };
    }
})();
