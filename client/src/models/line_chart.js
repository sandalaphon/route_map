var LineChart = function(container, title, temperatures, times, units){

    this.chart =  new Highcharts.chart({

        chart: {
            type: "line",
            renderTo: container,
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
            categories: times,
            title:{

                text: 'time'
            }
        },
        series:[{
            name: title,
            data: temperatures }],

    })
}

module.exports = LineChart