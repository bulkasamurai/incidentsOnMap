(function () {

    "use strict";

    angular.module('mapApp')
        .factory('incidentsService', incidentsService);

    incidentsService.$inject = ['$q', '$http'];

    function incidentsService($q, $http) {

        var incidents = [];

        return {
            getIncidentById: getIncidentById,
            saveIncident: saveIncident,
            getAllIncidents: getAllIncidents
        };

        ///////////////////

        function getAllIncidents(user, forceUpdate) {
            forceUpdate = forceUpdate || false;
            if (incidents.length > 0 && !forceUpdate) {
                return $q.when(incidents);
            }
            else {
                return $http.get("http://localhost:3000/shared/incidents.json")
                    .then(function (response) {
                        return incidents = response.data.incidents;
                    });
            }
        }

        function getIncidentById(Номер) {
            return $q.when(function () {
                return angular.copy(incidents.filter(function (incident) {
                    return parseInt(incident.Номер.substr(5)) == parseInt(Номер.substr(5));
                })[0]);
            }());
        }

        function saveIncident(updatedIncident) {
            // замена инцидента
            var forUpdate = incidents.filter(function (incident) {
                return incident.Номер == updatedIncident.Номер;
            })[0];
            var index = incidents.indexOf(forUpdate);
            incidents.splice(index, 1);
            incidents.push(updatedIncident); // сохранение изменений
        }
    }
})();