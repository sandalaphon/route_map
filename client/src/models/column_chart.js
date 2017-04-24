var ColumnChart = function(title, data, categories) {

  var container = document.querySelector("#rainfall-display")


    var chart = new Highcharts.Chart({ 
      chart: {
        type: 'column',
        renderTo: container
      },
      title: { 
        text: title 
      },
      series: [data],
          xAxis: { 
            categories: categories
          },
    });

};

module.exports = ColumnChart