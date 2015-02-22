/**
 * Created by Mehdi on 2015-02-22.
 */

gitStats.controller('repoCtrl', function($scope,$stateParams,$state,$localStorage){
    var a= $localStorage.org;
    var b= $localStorage.name;
    $scope.repos = $localStorage.myRepos;


    $http.get('/api/repos/'+a+'/'+b+'/groups').
        success(function(data,status){
        console.log(success);
            $scope.groupLabels =data;
        }).
        error(function(data,status){
            console.log(status);
        });


    $scope.addGroupLabel = function(){
        $http.('api/repos/'+a+'/'+b+'/groups').
            success(function(data,status){
            console.log(status);

        }).
            error(function(data,status){
            console.log(status);
        })
    }

});



