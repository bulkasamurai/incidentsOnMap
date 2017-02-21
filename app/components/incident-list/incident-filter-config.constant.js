(function () {

    'use strict';

    angular
        .module('mapApp')
        .constant('incidentFilterConfig', {
            ALL: {
                name: "Все",
                condition: function (incidents) {
                    return incidents;
                }
            },
            OFFICE: {
                name: "Офис",
                condition: function (incident) {
                    return incident.АдресУстановки.includes('Кропоткина') && incident.АдресУстановки.includes('57');
                }
            },
            MINSK: {
                name: "Минск",
                condition: function (incident) {
                    return incident.ТекущийИсполнитель === 'Minsk_ELBA';
                }
            },
            NEW: {
                name: "Новые",
                condition: function (incident) {
                    return incident.ДатаВыезда === '0001-01-01T00:00:00' && incident.ДатаПовторнойРеакции === '0001-01-01T00:00:00';
                }
            },
            TODAY: {
                name: "Сегоднящние",
                condition: function (incident) {
                    return new Date(incident.ДатаПовторнойРеакции).toDateString() === new Date().toDateString() && incident.ТекущийИсполнитель === 'Minsk_ELBA';
                }
            },
            EMPTY: {
                name: "Пустые",
                condition: function (incident) {
                    return incident.coordinates == undefined && !incident.АдресУстановки.includes('Кропоткина');
                }
            }
        });
})();