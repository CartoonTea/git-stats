var app = angular.module('gitStats' , [
    'ui.route',
])
.config((function($stateProvider, $urlRouterProvider) {

        $urlRouterProvider.otherwise('/Home');

        $stateProvider
            .state('Home', {
                url: '/Home',
                templateUrl: 'tempates/Home.html'
            })
            .state('Dashboard', {
                url: '/Dashboard',
                templateUrl: 'tempates/Dashboard.html'
            });

    });
