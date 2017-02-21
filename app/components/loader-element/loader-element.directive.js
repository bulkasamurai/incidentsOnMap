(function () {

    'use strict';

    angular
        .module('mapApp')
        .directive('loader', loaderElement);

    /* @ngInject */
    function loaderElement() {
        return {
            restrict: 'A',
            scope: true,
            templateUrl: 'components/loader-element/loader-element.template.html'
        };
    }
})();
