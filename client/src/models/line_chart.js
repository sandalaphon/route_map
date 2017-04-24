var LineChart = function(container, title, temperatures, times){

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
                text: title

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