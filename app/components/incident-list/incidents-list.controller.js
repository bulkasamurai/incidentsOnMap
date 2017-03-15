(function () {

    "use strict";

    angular.module('mapApp')
        .controller("incidentListController", incidentListController);

    incidentListController.$inject = ['incidentsService', '$scope', 'incidentCustomEvents', 'loginService'];

    /* @ngInject */
    function incidentListController(incidentsService, $scope, incidentCustomEvents, loginService) {

        var vm = this;
        var user = loginService.isLoggedIn();

        vm.incidents = [];
        vm.incidentsLoading = false;
        vm.incidentsFilters = incidentsService.getAvailableFilters();
        vm.selectedIncidentsFilter = "";

        vm.showOnMap = showOnMap;
        vm.searchFilter = searchFilter;
        vm.incidentsFilterChanged = incidentsFilterChanged;

        init();

        /////////////////////////

        function init() {
            loadAllIncidents(user);
        }

        function loadAllIncidents(user, filter, forceUpdate) {
            vm.incidentsLoading = true;
            incidentsService.getAllIncidents(user, filter, forceUpdate).then(successIncidentsLoading);
        }

        function successIncidentsLoading(res) {
            vm.incidents = res;
            vm.incidentsLoading = false;
        }

        function showOnMap(Номер) {
            $scope.$emit(incidentCustomEvents.SHOW_INCIDENT_ON_MAP, Номер);
        }

        function searchFilter() {
            return vm.search;
        }

        $scope.$on(incidentCustomEvents.REFRESH_INCIDENTS, function () {
            loadAllIncidents(user, vm.selectedIncidentsFilter, true);
        });

        function incidentsFilterChanged(filter) {
            incidentsService.getAllIncidents(user, filter).then(successIncidentsLoading);
        }

    }
})();