(function () {

    "use strict";

    angular.module('mapApp')
        .factory('mapService', mapService);

    mapService.$inject = ['$q', 'mapMessages'];

    function mapService($q) {

        var incidentMarkers = [];

        return {
            addIncidentMarker: addIncidentMarker,
            getAllIncidentsMarkers: getAllIncidentsMarkers,
            getIncidentMarkerById: getIncidentMarkerById,
            getPosition: getPosition
        };

        ///////////////////////////

        function getPosition(address, gmap) {

            var deferred = $q.defer();
            gmap.setBounds([
                [51.610673, 23.317332],
                [56.114210, 31.962576]
            ]);
            deferred.resolve(ymaps.geocode(address, {
                boundedBy: gmap.getBounds(),
                strictBounds: true
            }).then(function (res) {
                return res.geoObjects.get(0).geometry.getCoordinates();
            }));

            return deferred.promise;
        }

        function addIncidentMarker(incidentMarker, gmap) {
            incidentMarkers.forEach(function (incident) {
                if (incident.incident.Номер == incidentMarker.incident.Номер) {
                    var index = incidentMarkers.indexOf(incident);
                    gmap.geoObjects.remove(incidentMarkers[index].marker);
                    incidentMarkers[index].marker = null;
                    incidentMarkers.splice(index, 1);
                }
            });
            incidentMarkers.push(incidentMarker);
        }

        function getAllIncidentsMarkers() {
            return incidentMarkers;
        }

        function getIncidentMarkerById(Номер) {
            return incidentMarkers.filter(function (incidentMarker) {
                return incidentMarker.incident.Номер == Номер;
            })[0];
        }

    }
})();