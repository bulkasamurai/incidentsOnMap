(function () {

    'use strict';

    angular
        .module('mapApp')
        .constant('incidentCustomEvents', {
            INCIDENT_LOADED: 'incidentsLoaded',
            SHOW_INCIDENT_ON_MAP: 'showIncidentsOnMap',
            SHOW_SAVED: 'showSaved',
            INCIDENT_DELETED: 'incidentsDeleted',
            REFRESH_INCIDENTS: 'refreshIncidents'
        });
})();