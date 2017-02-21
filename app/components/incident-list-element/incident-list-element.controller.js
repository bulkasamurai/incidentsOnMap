(function(){

    "use strict";

    angular.module('mapApp')
        .controller('incidentListElementController', incidentListElementController);

    incidentListElementController.$inject = ['$scope', 'incidentCustomEvents'];

    function incidentListElementController($scope, incidentCustomEvents){
        var vm = this;

        // passed from bindToController parameter
        //vm.incidentModel = {};

        $scope.showOnMap = showOnMap;

        /////

        function showOnMap(Номер) {
            $scope.$emit(incidentCustomEvents.SHOW_INCIDENT_ON_MAP, Номер);
        }

    }

})();