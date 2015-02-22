var gitStats = angular.module('gitStats' , [
    'ui.router',
    'ngStorage'
]);
gitStats.config((function($stateProvider,$urlRouterProvider,$httpProvider,$locationProvider) {

        $urlRouterProvider.otherwise('/Home');
        $httpProvider.defaults.useXDomain = true;
        $stateProvider

            .state('Home', {
                url: '/Home',
                templateUrl: '/client/templates/Home.html',
                controller:'homeCtrl'
            })
            //.state('Repo', {
            //    url: '/Repo/:RepoName',
            //    templateUrl: '/client/templates/Repo.html',
            //    controller:'RepoCrl'
            //})
            .state('Dashboard', {
                url: '/Dashboard',
                templateUrl: '/client/templates/Dashboard.html',
                controller:'dashCtrl',
                authenticate: true
            });

        $locationProvider.html5Mode(true);

    }));
