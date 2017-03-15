(function () {

    'use strict';

    angular
        .module('mapApp')
        .directive('navElement', navElement);

    /* @ngInject */
    function navElement() {
        return {
            restrict: 'A',
            scope: true,
            templateUrl: 'components/nav-element/nav-element.template.html'
        };
    }
})();