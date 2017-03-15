(function () {

    'use strict';

    angular
        .module('mapApp')
        .directive('loadingBar', ["$compile", loaderElement]);

    /* @ngInject */
    function loaderElement($compile) {
        return {
            restrict: 'A',
            scope: {
                loading: '=loadingBar',
                title: '@loadingBarTitle'
            },
            link: function ($scope, element) {
                var loadingElement = `<div class='progress-bar progress-bar-striped active' role='progressbar' aria-valuenow='100' ng-bind='title' ng-class='{"loader-none": !loading}'></div>`;
                element.append($compile(loadingElement)($scope));
            }
        };
    }
})();