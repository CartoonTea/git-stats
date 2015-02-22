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
            $scope.TOUT= data;
            $localStorage.TOUTES = $scope.TOUT;
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
        $http.update('/api/label-in-group/' + r.id, {"value":r}).
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
        $scope.currentUser=undefined;
        logout.logoutUser();
    };

    //Chart Stuff

        // Load the Visualization API and the piechart package.
    google.load('visualization', '1.0', {'packages':['corechart']});

    // Set a callback to run when the Google Visualization API is loaded.
    google.setOnLoadCallback(drawChart);

    // Callback that creates and populates a data table,
    // instantiates the pie chart, passes in the data and
    // draws it.
    function drawChart() {

        // Create the data table.
        var data = new google.visualization.DataTable();
        data.addColumn('number', 'Time');
        data.addColumn('number', 'Value');
        data.addRows([
            //['Mushrooms', 3],
            //['Onions', 1],
            //['Olives', 1],
            //['Zucchini', 1],
            //['Pepperoni', 2]
        ]);

        // Set chart options
        var options = {'title':'GitStats',
            'width':400,
            'height':300};

        // Instantiate and draw our chart, passing in some options.
        var chart = new google.visualization.LineChart(document.getElementById('chart_div'));
        chart.draw(data, options);
    }
    //Computation



});