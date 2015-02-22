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
        data.addColumn('string', 'Topping');
        data.addColumn('number', 'Slices');
        data.addRows([
            ['Mushrooms', 3],
            ['Onions', 1],
            ['Olives', 1],
            ['Zucchini', 1],
            ['Pepperoni', 2]
        ]);

        // Set chart options
        var options = {'title':'How Much Pizza I Ate Last Night',
            'width':400,
            'height':300};

        // Instantiate and draw our chart, passing in some options.
        var chart = new google.visualization.LineChart(document.getElementById('chart_div'));
        chart.draw(data, options);
    }

    //Computation

//    var noWay = $localStorage.TOUTES;
//    $scope.entry
//
//    $scope.entryFn =function buildRelationEvaluator(str) {
//        function isNumber(n) {
//            return !isNaN(parseFloat(n)) && isFinite(n);
//        }
//        return new Function('issue',(function() {
//            var arr=str.split(new RegExp('[\+\*\/-]','g'));
//            var out='return ';
//            var j=-1;
//            for(var i=0;i<arr.length;i++){
//                j+=arr[i].length+1;
//                if (!isNumber(arr[i])) {
//                    if (i<arr.length-1) {
//                        out=out.concat('issue.'.concat(arr[i].concat(str.charAt(j))));
//                    }else{
//                        out=out.concat('issue.'.concat(arr[i]));
//                    }
//                }else{
//                    if (i<arr.length-1) {
//                        out=out.concat(arr[i].concat(str.charAt(j)));
//                    }else{
//                        out=out.concat(arr[i]);
//                    }
//                }
//            }
//            return out;
//        })());
//    };
//
//
//    function buildTimeline(noWay){
//        function bin(start,stop) {
//            this.start=start;
//            this.stop=stop;
//            this.issues=[];
//        }
//        times=[];
//        for(var i=0;i<issues.length;i++){
//            times.push(issues[i].created_at);
//            times.push(issues[i].closed_at);
//        }
//        times.sort();
//        bins=[];
//        for(var i=0;i<issues.length-1;i++){
//            bins.push(new bin(times[i],times[i+1]));
//        }
//
//        for (var i=0;i<issues.length;i++) {
//            var issue=issues[i];
//            var found=false;
//            for(var j=0;j<bins.length;j++){
//                var bin=bins[j];
//
//                if (!found) {
//                    if (issue.created_at>=bin.start&&issue.created_at<bin.stop) {
//                        bin.issues.push(issue);
//                        if (!found) {
//                            found=true;
//                        }
//                    }
//                }else{
//                    bin.issues.push(issue);
//                    if (issue.closed_at<bin.stop) {
//                        break;
//                    }
//
//                }
//                //data=new google.visualization.DataTable({
//                //         cols: [{id: 'time', label: 'Time', type: 'date'},
//                //           {id: 'load', label: 'Workload', type: 'number'}],
//                //         rows:rows
//                //    })
//            }
//        }
//        return bins;
//    }
//    var data;
//    function initDataTable(bins,f) {
//        var rows = [];
//        for (var i=0;i<bins.length;i++) {
//            var bin = bins[i];
//            var v=0;
//            for (var j=0;j<bin.issues.length;j++) {
//                temp=f(bin.issues[j])
//                if (!isNaN(temp)) {
//                    v+=temp;
//                }
//            }
//            rows.push({c:[{v: bin.start}, {v: v}]});
//            rows.push({c:[{v: bin.stop}, {v: v}]});
//        }
//        //data=new google.visualization.DataTable({
//        //         cols: [{id: 'time', label: 'Time', type: 'date'},
//        //           {id: 'load', label: 'Workload', type: 'number'}],
//        //         rows:rows
//        //    })
//    }
//
////function initGraph
//
//    function updateDataTable(bins,f) {
//        var out = [];
//        for (var i=0;i<bins.length;i++) {
//            var bin = bins[i];
//            var v=0;
//            for (var j=0;j<bin.issues.length;j++) {
//                temp=f(bin.issues[j]);
//                if (!isNaN(temp)) {
//                    v+=temp;
//                }
//            }
//            data.setValue(2*i-2,1,v);
//            data.setValue(2*i-1,1,v);
//        }
//    }
//
//    var  f = buildRelationEvaluator('actual/size+actual*size/actual-2*actual');
//    console.info(f);
//    foo=[];
//
//    foo[0]={size:1,actual:3,created_at:1,closed_at:4};
//    foo[1]={size:3,actual:1,created_at:3,closed_at:6};
//    foo[2]={size:6,actual:3,created_at:7,closed_at:9};
//
//
//
//
//    bins=buildTimeline(foo);
//    initDataTable(bins,f);
//
//    return;
//
//
//    function drawChart() {
//        var data=new Array(issues.length);
//        for (var i=0;i<data.length;i++) {
//            data[i]=[issues[i].x,f(issues[i])];
//        }
//        data = google.visualization.arrayToDataTable(data);
//
//
//
//        var options = {
//            title: 'Company Performance',
//            curveType: 'function',
//            legend: { position: 'bottom' }
//        };
//
//        var chart = new google.visualization.LineChart(document.getElementById('curve_chart'));
//
//        chart.draw(data, options);
//    }
//
//    function drawChartMaterial() {
//
//        var data=new Array(issues.length);
//        for (var i=0;i<data.length;i++) {
//            data[i]=[issues[i].x,f(issues[i])];
//        }
//        data = google.visualization.arrayToDataTable(data);
//
//
//        var options = {
//            chart: {
//                title: 'Box Office Earnings in First Two Weeks of Opening',
//                subtitle: 'in millions of dollars (USD)'
//            },
//            width: 900,
//            height: 500
//        };
//
//        var chart = new google.charts.Line(document.getElementById('linechart_material'));
//
//        chart.draw(data, options);
//    }
//
//




});