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
                controller:'homeCtrl',
                data: {
                    requireLogin: false
                }
            })
            .state('Stats', {
                url: '/Stats',
                templateUrl: '/client/templates/Stats.html',
                controller:'repoCtrl',
                    data: {
                        requireLogin: false
                }
                })
            .state('Dashboard', {
                url: '/Dashboard',
                templateUrl: '/client/templates/Dashboard.html',
                controller:'dashCtrl',
                data: {
                    requireLogin: true
                }
            })

            .state('Repo', {
                url: '/{Org}/{Repo}',
                templateUrl: '/client/templates/Repo.html',
                controller:'dashCtrl',
                data:{
                    requireLogin:true
                }
            });

        $locationProvider.html5Mode(true);

    }));
gitStats.run(function ($rootScope,$state) {
    $rootScope.$on('$stateChangeStart', function (event,toState){
        var requireLogin = toState.data.requireLogin;
        if (requireLogin && !$rootScope.currentUser){
            $state.go('Home');
        }
    });
});