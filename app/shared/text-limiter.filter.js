(function () {

    'use strict';

    angular
        .module('mapApp')
        .filter('textLimiter', function () {
            return function (text, maxLength) {
                return text.length > 30 ? text.substring(0, maxLength) + " ..." : text;
            }
        });
})();