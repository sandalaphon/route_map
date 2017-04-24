var ColumnChart = function(title, data, categories, units) {

  var container = document.querySelector("#rainfall-display")


    var chart = new Highcharts.Chart({ 
      chart: {
        type: 'column',
        renderTo: container
      },
      title: { 
        text: title 
      },
      yAxis: {
          title: {
              text: title + " " + units

          }
      },  
      xAxis:{
          categories: categories,
          title:{

              text: 'time'
          }
      },
      series: [{
        name: title,
        data: data}],
          
    });

};

module.exports = ColumnChart