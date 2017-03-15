(function () {

    "use strict";

    angular.module('mapApp')
        .service('loginService', loginService);

    function loginService() {

        var users = [
            {
                login: 'СазоновАА',
                password: 'qwerty'
            },

        ];

        var loggedIn = false;

        return {
            isLoggedIn: isLoggedIn,
            signIn: signIn
        };

        ////////////////////////

        function isLoggedIn() {
            return loggedIn;
        }

        function signIn(login, password) {
            return loggedIn = (
                users.filter(function (user) {
                    return login === user.login && password === user.password;
                })[0]);
        }

    }

})();