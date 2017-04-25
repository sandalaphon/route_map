
var ColumnChart = function(container, title, data, categories, units, xAxisText) {


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


               text: xAxisText
           }
       },
       series: [{
         name: title,
         data: data}],
           
     });


  };

  module.exports = ColumnChart
