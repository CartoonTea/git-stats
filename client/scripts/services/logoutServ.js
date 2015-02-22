/**
 * Created by Mehdi on 2015-02-21.
 */
gitStats.service('logout', function($scope,$http,$stateParams,$state) {
    this.logoutUser = function () {

        $http.delete('/api/session').
            success(function (data, status) {
                console.log(status);
                $state.go('Home');
            }).
            error(function (data, status) {
                console.log(status);
            });
    }

});
