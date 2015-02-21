var app = angular.module('gitstats' , [
    'ui.route',
])
.config(function($stateProvider) {
        $stateProvider
            .state("Home", {
                url: "/Home",
                templateUrl: "templates/Home.html"
            })
    });
