/**
 * Created by Mehdi on 2015-02-21.
 */

gitStats.controller('homeCtrl', function($scope, $http){
    //Public repos
    $scope.getPublicRepos="user,public_repo";
    $scope.redirectPublicPath = 'https://github.com/login/oauth/authorize?client_id=a32040ef864339506ec5&scope='+$scope.getPublicRepos;
    //Private repos
    $scope.getPrivateRepos ="user,repos";
    $scope.localUrl ="client/#/Dashboard";
    $scope.redirectPrivatePath = 'https://github.com/login/oauth/authorize?client_id=a32040ef864339506ec5&scope='+$scope.getPrivateRepos;

    //private repos


//$scope.gitLogin = function(){

//    $http.get('https://github.com/login/oauth/authorize/a32040ef864339506ec5/'+$scope.redirectPath+'//').
//        success(function(data, status, headers, config) {
//            console.log(status);
//        }).
//        error(function(data, status, headers, config) {
//            console.log(status);
//        });
//};

});