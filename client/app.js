var gitStats = angular.module('gitStats' , [
    'ui.router'
]);
gitStats.config((function($stateProvider,$urlRouterProvider,$httpProvider) {

        $urlRouterProvider.otherwise('/Home');
        $httpProvider.defaults.useXDomain = true;
        $stateProvider

            .state('Home', {
                url: '/Home',
                templateUrl: '/client/templates/Home.html',
                controller:'homeCtrl'
            })
            .state('Dashboard', {
                url: '/Dashboard',
                templateUrl: '/client/templates/Dashboard.html'
            })

    }));
