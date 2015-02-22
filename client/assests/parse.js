function buildRelationEvaluator(str) {
    function isNumber(n) {
        return !isNaN(parseFloat(n)) && isFinite(n);
    }
    return new Function('issue',(function() {
        var arr=str.split(new RegExp('[\+\*\/-]','g'));
        var out='return ';
        var j=-1;
        for(var i=0;i<arr.length;i++){
            j+=arr[i].length+1;
            if (!isNumber(arr[i])) {
                if (i<arr.length-1) {
                    out=out.concat('issue.'.concat(arr[i].concat(str.charAt(j))));
                }else{
                    out=out.concat('issue.'.concat(arr[i]));
                }
            }else{
                if (i<arr.length-1) {
                    out=out.concat(arr[i].concat(str.charAt(j)));
                }else{
                    out=out.concat(arr[i]);
                }
            }

            
        }
        return out;
    })());
}


function buildTimeline(issues){
    function bin(start,stop) {
        this.start=start;
        this.stop=stop;
        this.issues=[];
    }
    times=[];
    for(var i=0;i<issues.length;i++){
        times.push(issues[i].created_at);
        times.push(issues[i].closed_at);
    }
    times.sort();
    bins=[];
    for(var i=0;i<issues.length-1;i++){
        bins.push(new bin(times[i],times[i+1]));
    }
    
    for (var i=0;i<issues.length;i++) {
        var issue=issues[i];
        var found=false;
        for(var j=0;j<bins.length;j++){
            var bin=bins[j];

            if (!found) {
                if (issue.created_at>=bin.start&&issue.created_at<bin.stop) {
                    bin.issues.push(issue);
                    if (!found) {
                        found=true;
                    }
                }
            }else{
                bin.issues.push(issue);
                if (issue.closed_at<bin.stop) {
                    break;
                }
                
            }
                //data=new google.visualization.DataTable({
    //         cols: [{id: 'time', label: 'Time', type: 'date'},
    //           {id: 'load', label: 'Workload', type: 'number'}],
    //         rows:rows
    //    })
        }
    }
    return bins;
}
var data;
function initDataTable(bins,f) {
    var rows = [];
    for (var i=0;i<bins.length;i++) {
        var bin = bins[i];
        var v=0;
        for (var j=0;j<bin.issues.length;j++) {
            temp=f(bin.issues[j])
            if (!isNaN(temp)) {
                v+=temp;
            }
        }
        rows.push({c:[{v: bin.start}, {v: v}]});
        rows.push({c:[{v: bin.stop}, {v: v}]});
    }
    //data=new google.visualization.DataTable({
    //         cols: [{id: 'time', label: 'Time', type: 'date'},
    //           {id: 'load', label: 'Workload', type: 'number'}],
    //         rows:rows
    //    })
}

//function initGraph

function updateDataTable(bins,f) {
    var out = [];
    for (var i=0;i<bins.length;i++) {
        var bin = bins[i];
        var v=0;
        for (var j=0;j<bin.issues.length;j++) {
            temp=f(bin.issues[j])
            if (!isNaN(temp)) {
                v+=temp;
            }
        }
        data.setValue(2*i-2,1,v);
        data.setValue(2*i-1,1,v);
    }
}

var  f = buildRelationEvaluator('actual/size+actual*size/actual-2*actual');
console.info(f);
foo=[];

foo[0]={size:1,actual:3,created_at:1,closed_at:4};
foo[1]={size:3,actual:1,created_at:3,closed_at:6};
foo[2]={size:6,actual:3,created_at:7,closed_at:9};

bins=buildTimeline(foo);
initDataTable(bins,f);

return;


 function drawChart() {
        var data=new Array(issues.length);
        for (var i=0;i<data.length;i++) {
            data[i]=[issues[i].x,f(issues[i])];
        }
        data = google.visualization.arrayToDataTable(data);
        
        

        var options = {
          title: 'Company Performance',
          curveType: 'function',
          legend: { position: 'bottom' }
        };

        var chart = new google.visualization.LineChart(document.getElementById('curve_chart'));

        chart.draw(data, options);
}

function drawChartMaterial() {

     var data=new Array(issues.length);
        for (var i=0;i<data.length;i++) {
            data[i]=[issues[i].x,f(issues[i])];
        }
        data = google.visualization.arrayToDataTable(data);
        

      var options = {
        chart: {
          title: 'Box Office Earnings in First Two Weeks of Opening',
          subtitle: 'in millions of dollars (USD)'
        },
        width: 900,
        height: 500
      };

      var chart = new google.charts.Line(document.getElementById('linechart_material'));

      chart.draw(data, options);
    }


