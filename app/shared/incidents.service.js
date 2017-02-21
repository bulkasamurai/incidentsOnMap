(function () {

    "use strict";

    angular.module('mapApp')
        .factory('incidentsService', incidentsService);

    incidentsService.$inject = ['$timeout', '$http'];

    function incidentsService($timeout, $http) {

        var incidents = [];

        return {

            getIncidentById: getIncidentById,
            saveIncident: saveIncident,
            getAllIncidents: getAllIncidents,
            incidentRequest: incidentRequest
        };

        ///////////////////

        function getAllIncidents(user) {
            if (incidents.length > 0) {
                return $timeout(function () {
                    return incidents;
                })
            }
            else {
                return incidentRequest(user);
            }
        }

        function incidentRequest(user) {
            return $http.get("http://localhost:3000/shared/incidents.json")
                .then(function (response) {
                    return incidents = response.data.incidents;
                });
        }

        function getIncidentById(Номер) {
            return $timeout(function () {
                return angular.copy(incidents.filter(function (incident) {
                    return parseInt(incident.Номер.substr(5)) == parseInt(Номер.substr(5));
                })[0]);
            }, 100);
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