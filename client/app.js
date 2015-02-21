var app = angular.module('gitStats' , [
    'ui.route',
])
.config(function($stateProvider) {
        $stateProvider
            .state("Home", {
                url: "/Home",
                templateUrl: "templates/Home.html"
            })
    });
