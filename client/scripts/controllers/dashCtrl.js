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
    };
    var a =  $localStorage.org;
    var b = $localStorage.name;

    //Getting GROUPS
    $http.get('/api/repos/'+a+'/'+b).
        success(function(data,status){
            console.log(status);

        }).
        error(function(data,status){
            console.log(status);
        });

    $scope.$watch( $scope.newGroupLabel, function(newVal) {
        $http.get('/api/repos/'+a+'/'+b+'/groups').
            success(function(data,status){
                console.log(status);
                console.log(data);
                $scope.glabels =data;
                console.log($scope.glabels);
                $scope.newGroupLabel="";
            }).
            error(function(data,status){
                console.log(status);
            });
    });
    //$http.get('/api/repos/'+a+'/'+b+'/groups').
    //    success(function(data,status){
    //        console.log(status);
    //        console.log(data);
    //        $scope.glabels =data;
    //        console.log($scope.glabels);
    //    }).
    //    error(function(data,status){
    //        console.log(status);
    //    });

    //POSTING NEW GROUP LABEL
    $scope.addGroupLabel = function(x){
        $http.post('api/repos/'+a+'/'+b+'/groups' ,{name :x}).
            success(function(data,status){
            console.log(status);

        }).
            error(function(data,status){
            console.log(status);
        })
    };

    //DELETE GROUP LABEL
    $scope.deleteGroupLabel = function (a){
        $http.delete('api/groups/'+a).
            success(function(data,status){
                console.log(status);
            }).
            error(function(data,status){
            console.log(status);

            });
    }




});

