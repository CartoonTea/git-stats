/**
 * Created by Mehdi on 2015-02-21.
 */

gitStats.controller('dashCtrl', function($scope,$localStorage,$stateParams,$state,$http,logout){
    $scope.repos= $localStorage.myRepos;
    console.log($scope.repos);

    $scope.repoIDfn = function(a,b){
        $localStorage.org =a;
        $localStorage.name =b;
        $state.go('Repo', { Org:a, Repo:b});
    };
    $scope.a =  $localStorage.org;
    $scope.b = $localStorage.name;

    //Getting GROUPS
    $http.get('/api/repos/'+$scope.a+'/'+$scope.b).
        success(function(data,status){
            console.log(status);

        }).
        error(function(data,status){
            console.log(status);
        });


        $http.get('/api/repos/'+$scope.a+'/'+$scope.b+'/groups').
            success(function(data,status){
                console.log(status);
                console.log(data);
                $scope.glabels =data;
                console.log($scope.glabels);

            }).
            error(function(data,status){
                console.log(status);
            });

    //GETTING LABELS
    $http.get('/api/repos/'+$scope.a+'/'+$scope.b+'/labels').
        success(function(data,status){
            console.log(status);
            console.log(data);
            $scope.labels =data;
        }).
        error(function(data,status){
            console.log(status);
        });

    //POSTING NEW GROUP LABEL
    $scope.addGroupLabel = function(x){
        $http.post('api/repos/'+$scope.a+'/'+$scope.b+'/groups' ,{name :x}).
            success(function(data,status){
            console.log(status);
            $scope.glabels.push({
                name: x
            });
                $scope.newGroupLabel=""
        }).
            error(function(data,status){
            console.log(status);
        })
    };

    //DELETE GROUP LABEL
    $scope.deleteGroupLabel = function (a){
        $http.delete('/api/groups/'+a).
            success(function(data,status){
                console.log(status);
                console.log($scope.glabels);
                   $scope.glabels.splice(a,1);
                    $scope.$apply();

            }).
            error(function(data,status){
            console.log(status);

            });
    };

    // GETTING LABELS^VALUES OF GROUP LABEL
    $scope.clickGlabel = function(y,u){

    $http.get('/api/groups/'+y+'/labels').
        success(function(data,status){
            console.log(status);
            $scope.valueLabels= data;
            console.log($scope.valueLabels);
            $scope.showing = true;
            $scope.container = u;
            $scope.containerID = y;
        }).
        error(function(data,status){
           console.log(status);
        });

    };

    //ADD LABEL TO GROUP.L CONTAINER
    $scope.addGcontainer = function(o,c,e){
        $http.post('/api/groups/'+$scope.containerID+'/labels', {"label":o,"value":c}).
            success(function(data,status){
                console.log(status);
                $scope.valueLabels.push({
                    "label":e,
                    "value":c
                })
            }).
            error(function(data,status){
                console.status;
            });

    };
    $scope.setValueC = function(r){
        $http.update('', {"value":r}).
            success(function(data,status){
                console.log(status);
                $scope.valueLabels.push({
                    "value":r
                })
            }).
            error(function(data,status){
                console.log(status);
            })
    };

    $scope.out = function(){
        logout.logoutUser();
    }
});