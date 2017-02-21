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
        vm.incidentFilters = incidentFilterConfig;
        vm.currentFilterPlace = vm.incidentFilters.ALL.condition;

        vm.showOnMap = showOnMap;
        vm.searchFilter = searchFilter;

        init();

        /////////////////////////

        function init() {
            requestAnswer(incidentsService.getAllIncidents(user));
            /*incidentsService.getAllIncidents(user).then(function (res) {
                vm.incidents = res;
                $scope.$emit(incidentCustomEvents.INCIDENT_LOADED, vm.incidents);
            });*/
        }

        function requestAnswer(fn) {
            fn.then(function (res) {
                vm.incidents = res;
                $scope.$emit(incidentCustomEvents.INCIDENT_LOADED, vm.incidents);
            });
        }

        function showOnMap(Номер) {
            $scope.$emit(incidentCustomEvents.SHOW_INCIDENT_ON_MAP, Номер);
        }

        function searchFilter () {
            return vm.search;
        }

        $scope.selected = incidentFilterConfig.ALL;

        $scope.$on(incidentCustomEvents.REFRESH_INCIDENTS, function () {
            vm.incidents = [];
            requestAnswer(incidentsService.incidentRequest(user));
        })
    }
})();