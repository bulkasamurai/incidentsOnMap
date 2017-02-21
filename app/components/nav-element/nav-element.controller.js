(function () {

    "use strict";

    angular.module('mapApp')
        .controller('navElementController', navElementController);

    navElementController.$inject = ['$rootScope', 'incidentCustomEvents', '$location', 'incidentsService'];

    function navElementController($rootScope, incidentCustomEvents, $location, incidentsService) {
        var vm = this;

        vm.refresh = refresh;

        /////////////////////

        function refresh() {
            /*location.reload();*/
            $location.path('/incidents');
            $rootScope.$broadcast(incidentCustomEvents.REFRESH_INCIDENTS);
        }

    }

})();
