(function () {

    'use strict';

    angular
        .module('mapApp')
        .directive('incident', incidentList);

    /* @ngInject */
    function incidentList() {
        return {
            restrict: 'E',
            scope: true,
            bindToController: {
                incidentModel: "="
            },
            controller:'incidentListElementController as vm',
            templateUrl: 'components/incident-list-element/incident-list-element.template.html'
        };
    }
})();