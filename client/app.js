var gitStats = angular.module('gitStats' , [
    'ui.router'
]);
gitStats.config((function($stateProvider,$urlRouterProvider){

        $urlRouterProvider.otherwise('/Home');
        $stateProvider

            .state('Home', {
                url: '/Home',
                templateUrl: 'templates/Home.html',
                controller:'homeCtrl'
            })
            .state('Dashboard', {
                url: '/Dashboard',
                templateUrl: 'templates/Dashboard.html'
            });

            //$locationProvider.html5Mode(true);


    }));
