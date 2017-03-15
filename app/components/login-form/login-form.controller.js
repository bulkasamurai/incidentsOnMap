(function(){

    "use strict";

    angular.module('mapApp')
        .controller('loginFormController', loginFormController);

    loginFormController.$inject = ['loginService', '$location', 'loginFormCustomEvents'];

    /* @ngInject */
    function loginFormController(loginService, $location, loginFormCustomEvents){

        var vm = this;

        vm.errorText='';
        vm.user = {
            login:"",
            password:''
        };

        vm.signIn = signIn;

        /////////////////////////

        function signIn(login, password) {
            if(loginService.signIn(login, password)){
                $location.path("/incidents");
            }
            else {
                vm.errorText = loginFormCustomEvents.ERROR_MESSAGE;
            }
        }
    }

})();