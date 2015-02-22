/**
 * Created by Mehdi on 2015-02-22.
 */

gitStats.controller('repoCtrl', function($scope,$stateParams,$state,$localStorage,logout){
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
    };
    $scope.out = function(){
        $scope.currentUser=undefined;
        logout.logoutUser();
    }

    //Chart Stuff
    google.setOnLoadCallback(drawChart);

    function drawChart() {
        var data = google.visualization.arrayToDataTable([
            ['Year', 'Sales', 'Expenses'],
            ['2004',  1000,      400],
            ['2005',  1170,      460],
            ['2006',  660,       1120],
            ['2007',  1030,      540]
        ]);

        var options = {
            title: 'Company Performance',
            curveType: 'function',
            legend: { position: 'bottom' }
        };

        var chart = new google.visualization.LineChart(document.getElementById('curve_chart'));

        chart.draw(data, options);
    }

});



