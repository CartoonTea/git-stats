/**
 * Created by Mehdi on 2015-02-21.
 */
gitStats.service('logoutServ', function($scope,$http,$state) {
    this.logoutUser = function () {
        $http.delete('/api/session').
            success(function (data, status, headers, config) {
                console.log(status);
                //$scope.myRepos = "";
                $state.go('Home');

            }).
            error(function (data, status, headers, config) {
                console.log(status);
            });
    }
});
