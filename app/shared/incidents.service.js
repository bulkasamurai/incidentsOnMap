(function () {

    "use strict";

    angular.module('mapApp')
        .factory('incidentsService', incidentsService);

    incidentsService.$inject = ['$q', '$http', "incidentFilterConfig"];

    function incidentsService($q, $http, incidentFilterConfig) {

        var incidents = [],
            subscribers = [];

        return {
            getIncidentById: getIncidentById,
            saveIncident: saveIncident,
            getAllIncidents: getAllIncidents,
            getAvailableFilters: getAvailableFilters,
            subscribeToUpdates: subscribeToUpdates
        };

        ///////////////////

        function getAllIncidents(user, filter, forceUpdate) {
            forceUpdate = forceUpdate || false;
            if (incidents.length > 0 && !forceUpdate) {
                return successIncidentsLoad(angular.copy(incidents), filter);
            }
            else {
                return $http.get("http://localhost:3000/shared/incidents.json")
                    .then(function (response) {
                        incidents = response.data.incidents;
                        return successIncidentsLoad(angular.copy(incidents), filter);
                    });
            }

        }

        function successIncidentsLoad(incidents, filter) {
            let filteredIncidents = filter ? getFilteredIncidents(incidents, filter)
                : incidents;

            notifySubscribers(subscribers, filteredIncidents);
            return $q.when(filteredIncidents);
        }

        function getIncidentById(Номер) {
            return $q.when(
                angular.copy(incidents.filter(function (incident) {
                    return parseInt(incident.Номер.substr(5)) == parseInt(Номер.substr(5));
                })[0])
            );
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

        function getAvailableFilters() {
            let filters = {};
            for (let config in incidentFilterConfig) {
                filters[config] = incidentFilterConfig[config].name;
            }
            return filters;
        }

        function getFilteredIncidents(incidents, filter) {
            return incidents.filter(incidentFilterConfig[filter].condition);
        }

        function subscribeToUpdates(func) {
            if (subscribers.indexOf(func) && typeof func !== 'function') return;
            subscribers.push(func);
            return function unsubscribe() {
                subscribers.filter(function (subscriber) {
                    return subscriber !== func;
                });
            }
        }

        function notifySubscribers(subscribers, data) {
            subscribers.forEach(function (func) {
                func(data);
            });
        }
    }
})();