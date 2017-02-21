(function () {

    "use strict";

    angular.module('mapApp')
        .controller('mapController', mapController);

    mapController.$inject = ['$element', '$scope', 'incidentCustomEvents', 'mapMessages', 'mapService'];

    /* @ngInject */
    function mapController($element, $scope, incidentCustomEvents, mapMessages, mapService) {

        ymaps.ready(init);

        function init() {

            var initialCenter = [53.902249, 27.561908];


            var gmap = new ymaps.Map($element[0], {
                    center: initialCenter,
                    zoom: 12,
                    controls: []
                }),
                HintLayout = ymaps.templateLayoutFactory.createClass("<div class='my-hint'>" +
                    "<b>{{ properties.object }}</b><br />" +
                    "Дата выезда: {{ properties.date }}<br />" +
                    "<b>{{ properties.executor }}</b>" +
                    "</div>");


            /////////////////////////////////////

            $scope.$on(incidentCustomEvents.INCIDENT_LOADED, function (event, incidents) {
                incidents.forEach(function (incident) {
                    var incidentMarker = mapService.getIncidentMarkerById(incident.Номер);
                    if (!incidentMarker || incidentMarker.incident.АдресУстановки !== incident.АдресУстановки) {
                        mapService.getPosition(incident.АдресУстановки, gmap).then(function (res) {
                            console.log("Адресов геокодировано из " + incidents.length + " инцидентов");
                            incident.coordinates = res;
                            if (checkIncidentsCoordinates(incident)) {
                                createNewMarker(incident);
                            }
                        });
                    }
                });
                gmap.zoomRange.get(initialCenter);
                gmap.setCenter(initialCenter, 12);

            });

            $scope.$on(incidentCustomEvents.SHOW_INCIDENT_ON_MAP, function (event, Номер) {
                var incidentMarker = mapService.getIncidentMarkerById(Номер);
                if (incidentMarker) markerClickListener(incidentMarker);
            });

            function createNewMarker(incident) {
                var marker = new ymaps.Placemark(incident.coordinates, {
                    date: incident.ДатаВыезда,
                    executor: incident.ТекущийИсполнитель,
                    object: incident.Клиент
                }, {
                    iconColor: markerColor(incident),
                    hintLayout: HintLayout
                });
                gmap.geoObjects.add(marker);
                var incidentMarker = {
                    marker: marker,
                    incident: incident
                };
                marker.events.add('click', function () {
                    markerClickListener(incidentMarker);
                    window.location = "#/edit/" + incidentMarker.incident.Номер;
                });
                mapService.addIncidentMarker(incidentMarker, gmap);
            }

            function checkIncidentsCoordinates(incident) {
                if (!incident.coordinates) console.log(mapMessages.COORDINATES_UNDEFINED);
                return !!incident.coordinates;
            }

            function markerClickListener(incidentMarker) {
                setMapCenter(incidentMarker.marker.geometry.getCoordinates());
            }

            function setMapCenter(incidentCoordinates) {
                gmap.zoomRange.get(incidentCoordinates);
                gmap.setCenter(incidentCoordinates, 14);
            }

            function markerColor(incident){
                switch(incident.ТекущийИсполнитель) {
                    case 'Minsk_ELBA':  return 'red';
                        break;
                    case 'Леонович Дмитрий Андрианович': return 'orange';
                        break;
                    default: return 'green';
                        break;
                }
            }
        }

    }
})();