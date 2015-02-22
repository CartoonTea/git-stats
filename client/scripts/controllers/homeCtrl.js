/**
 * Created by Mehdi on 2015-02-21.
 */

gitStats.controller('homeCtrl', function($scope,$state,$http,$location,$localStorage){
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
        console.log($scope.CODE);
        //POST CODE TO API
        if(!angular.equals({}, $scope.CODE)) {
            $http.post('/api/session', $scope.CODE).
                success(function (data, status, headers, config) {
                    $scope.currentUser = data.email;
                    console.log($scope.currentUser);
                    $state.go('Dashboard');
                }).
                error(function (data, status, headers, config) {
                    console.log(status);
                });

        }

    });
});