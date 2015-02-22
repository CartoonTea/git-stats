/**
 * Created by Mehdi on 2015-02-22.
 */

gitStats.controller('repoCtrl', function($localStorage){

    var issues = $localStorage.TOUTES;


    var data = {
        labels: ["Time", "February", "March", "April", "May", "June", "July"],
        datasets: [
            {
                label: "My First dataset",
                fillColor: "rgba(220,220,220,0.2)",
                strokeColor: "rgba(220,220,220,1)",
                pointColor: "rgba(220,220,220,1)",
                pointStrokeColor: "#fff",
                pointHighlightFill: "#fff",
                pointHighlightStroke: "rgba(220,220,220,1)",
                data: issues
            }
            //{
            //    label: "My Second dataset",
            //    fillColor: "rgba(151,187,205,0.2)",
            //    strokeColor: "rgba(151,187,205,1)",
            //    pointColor: "rgba(151,187,205,1)",
            //    pointStrokeColor: "#fff",
            //    pointHighlightFill: "#fff",
            //    pointHighlightStroke: "rgba(151,187,205,1)",
            //    data: [28, 48, 40, 19, 86, 27, 90]
            //}
        ]
    };
    var ctx = document.getElementById("myChart").getContext("2d");
    var myNewChart = new Chart(ctx).Line(data);

});



