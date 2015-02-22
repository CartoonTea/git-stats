/**
 * Created by Mehdi on 2015-02-21.
 */

gitStats.controller('dashCtrl', function($scope,$localStorage,$stateParams,$state,$http){
    $scope.repos= $localStorage.myRepos;
    console.log($scope.repos);

    $scope.repoIDfn = function(a,b){
        $localStorage.org =a;
        $localStorage.name =b;
        $state.go('Repo', { Org:a, Repo:b});
        //$state.go('/Dashboard'+$stateParams.RepoName+'/'+$stateParams.RepoID);
    };

    //Getting GROUPS
    var a =  $localStorage.org;
    var b = $localStorage.name;
    $http.get('/api/repos/'+a+'/'+b+'/groups').
        success(function(data,status){
            console.log(status);
            $scope.glabels =data;
            console.log($scope.glabels);
        }).
        error(function(data,status){
            console.log(status);
        });

    //POSTING NEW GROUP LABEL
    $scope.addGroupLabel = function(){
        $http.post('api/repos/'+a+'/'+b+'/groups').
            success(function(data,status){
            console.log(status);

        }).
            error(function(data,status){
            console.log(status);
        })
    }




});

