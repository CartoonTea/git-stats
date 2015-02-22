/**
 * Created by Mehdi on 2015-02-22.
 */

gitStats.controller('repoCtrl', function($localStorage){

  $(function () {
    google.load('visualization', '1', {'packages':['corechart'], 'callback': drawChart });
    // google.setOnLoadCallback(drawChart);

    // Set a callback to run when the Google Visualization API is loaded.
  });
    //var issues = $localStorage.TOUTES;

// Load the Visualization API and the piechart package.

    // Callback that creates and populates a data table,
    // instantiates the pie chart, passes in the data and
    // draws it.
    function drawChart() {


        // Create the data table.
        var data = new google.visualization.DataTable();
        data.addColumn('string', 'Time');
        data.addColumn('number', 'Value');
        data.addRows([
            ['Mushrooms', 3],
            ['Onions', 1],
            ['Olives', 1],
            ['Zucchini', 1],
            ['Pepperoni', 2]
        ]);

        // Set chart options
        var options = {'title':'Repository Stats',
            'width':400,
            'height':300};

        // Instantiate and draw our chart, passing in some options.
        var chart = new google.visualization.LineChart(document.getElementById('chart_div'));
        chart.draw(data, options);
    }

});



