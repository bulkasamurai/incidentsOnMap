(function () {

    "use strict";

    angular.module('mapApp')
        .controller("incidentListController", incidentListController);

    incidentListController.$inject = ['incidentsService', '$scope', 'incidentCustomEvents', 'incidentFilterConfig', 'loginService'];

    /* @ngInject */
    function incidentListController(incidentsService, $scope, incidentCustomEvents, incidentFilterConfig, loginService) {

        var vm = this;
        var user = loginService.isLoggedIn();

        vm.incidents = [];
        vm.incidentsLoading = false;
        vm.incidentFilters = incidentFilterConfig;
        vm.currentFilterPlace = vm.incidentFilters.ALL.condition;
        $scope.selected = incidentFilterConfig.ALL; // todo: !!!

        vm.showOnMap = showOnMap;
        vm.searchFilter = searchFilter;

        init();

        /////////////////////////

        function init() {
            loadAllIncidents(user);
        }

        function loadAllIncidents(user, forceUpdate) {
            vm.incidentsLoading = true;
            incidentsService.getAllIncidents(user, forceUpdate).then(successIncidentsLoading);
        }

        function successIncidentsLoading(res) {
            vm.incidents = res;
            $scope.$emit(incidentCustomEvents.INCIDENT_LOADED, vm.incidents);
            vm.incidentsLoading = false;
        }

        function showOnMap(Номер) {
            $scope.$emit(incidentCustomEvents.SHOW_INCIDENT_ON_MAP, Номер);
        }

        function searchFilter() {
            return vm.search;
        }

        $scope.$on(incidentCustomEvents.REFRESH_INCIDENTS, function () {
            loadAllIncidents(user, true);
        });
    }
})();