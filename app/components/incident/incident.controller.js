(function () {

    "use strict";

    angular.module('mapApp')
        .controller("incidentController", incidentController);

    incidentController.$inject = ['incidentsService', '$routeParams', 'incidentInputLabels'];

    /* @ngInject */
    function incidentController(incidentsService, $routeParams, incidentInputLabels) {

        var vm = this;
        vm.incident = {};
        vm.incidentInputLabels = incidentInputLabels;

        activate();
        vm.updateIncident = updateIncident;

        /////////////////////////

        function activate() {
            initIncident();
        }

        function initIncident() {
            incidentsService.getIncidentById($routeParams.id).then(function (res) {
                vm.incident = res;
            })
        }

        function updateIncident() { // передаю в функцию сохранения свой измененный объект
            incidentsService.saveIncident(vm.incident);
        }
    }
})();
