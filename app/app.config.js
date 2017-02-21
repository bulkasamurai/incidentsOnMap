angular.module('mapApp')
    .config(['$routeProvider', function ($routeProvider) {

        $routeProvider
            .when('/login', {
                templateUrl: 'components/login-form/login-form.template.html',
                controller: 'loginFormController as vm'
            })
            .when('/incidents', {
                templateUrl: 'components/incident-list/incident-list.template.html',
                controller: 'incidentListController as vm',
                requires: {
                    login: true
                }
            })
            .when('/edit/:id', {
                templateUrl: 'components/incident/incident.template.html',
                controller: 'incidentController as vm',
                requires: {
                    login: true
                }
            })
            .otherwise({
                redirectTo: '/login'
            });
    }])
    .run(['$rootScope', '$location', 'loginService', function ($rootScope, $location, loginService) {

        $rootScope.$on('$routeChangeStart', checkAuthorization);

        function checkAuthorization(event, nextPage) {
            if(nextPage.requires && nextPage.requires.login && !loginService.isLoggedIn()){
                $location.path('/login')
            }
        }

    }]);
