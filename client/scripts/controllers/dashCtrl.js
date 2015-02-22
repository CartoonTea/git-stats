/**
 * Created by Mehdi on 2015-02-21.
 */

gitStats.controller('dashCtrl', function($scope,$localStorage,logoutServ){
    $scope.repos= $localStorage.myRepos;
    console.log($scope.repos);

    $scope.logout = function(){
        logoutServ.logoutUser()
    }

});

