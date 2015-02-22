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
        console.log(value);
        $scope.CODE = value;

        //POST CODE TO AP
        if($scope.CODE) {
            $http.post('/api/session', $scope.CODE).
                success(function (data, status, headers, config) {
                    console.log(status);
                    $state.go('Dashboard');
                }).
                error(function (data, status, headers, config) {
                    console.log(status);
                });
            console.log($scope.CODE);

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
        console.log($scope.CODE);

    });


    //$scope.$on('$locationChangeStart', function(event) {
    //    if ( $StateProvider() == 'callback') {
    //        $scope.CODE=  $scope.$location.search().code  Home?code=d0c08f10606008a57e80;
    //        console.log($scope.CODE);
    //
    //    }
    //});
    //$scope.$on("$stateChangeSuccess", function () {
    //    //if($location.search() !== "" ){
    //    //    $scope.CODE=  $location.code;
    //    console.log($scope.search());
    //}
    //});
    //$scope.$watch(function() {
    //    return $location.search();
    //}, function(){
    //    if($location.search().code !== "" ){
    //        $scope.CODE=  $location.code;
    //        console.log($scope.CODE);
    //    }
    //});
    //GETTING CODE FROM CALLBACK
    //$scope.CODE=  $scope.$location.search().code callback?code=1f633d6a30dd221e456c;



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