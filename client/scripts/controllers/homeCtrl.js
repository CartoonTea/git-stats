/**
 * Created by Mehdi on 2015-02-21.
 */

gitStats.controller('homeCtrl', function($scope,$state,$http,$location){
    //Public repos
    $scope.getPublicRepos="user,public_repo";
    $scope.redirectPublicPath = 'https://github.com/login/oauth/authorize?client_id=a32040ef864339506ec5&scope='+$scope.getPublicRepos;
    //Private repos
    $scope.getPrivateRepos ="user,repos";
    $scope.localUrl ="client/#/Dashboard";
    $scope.redirectPrivatePath = 'https://github.com/login/oauth/authorize?client_id=a32040ef864339506ec5&scope='+$scope.getPrivateRepos;

    $scope.$watch(function () {
        return $location.search()
    }, function (value) {
        $scope.CODE = value;
        //POST CODE TO AP
        if($scope.CODE) {
            $http.post('/api/session', $scope.CODE).
                success(function (data, status, headers, config) {
                    $state.go('Dashboard');
                }).
                error(function (data, status, headers, config) {
                    console.log(status);
                });
        }
        //GET REPOS
        $http.get('/api/repos').
            success(function (data, status, headers, config) {
                console.log(status);
                console.log(data);

            }).
            error(function (data, status, headers, config) {
                console.log(status);
            });
    });

});