var LineChart = require("./line_chart.js")
var ColumnChart = require("./column_chart")

var WeatherView = function(detailsElement){
  this.detailsElement = detailsElement
}

WeatherView.prototype = {

  render: function(weather){
    var chartContainer1 = document.querySelector("#temperature-display");
    var chartContainer2 = document.querySelector("#windspeed-display");
    var chartContainer3 = document.querySelector("#cloudcover-display")
    var chartContainer4 = document.querySelector("#rainfall-display")
    var chartTitleTemp = "Temperature"
    var chartTitleWindspeed = "Wind Speeds"
    var chartTitleCloudCover = "Cloud Cover"
    var chartTitleRainfall = "Rainfall"
    var temperatures = [];
    var times = [];
    var cloudCover = [];
    var windSpeed = [];
    var windDirection = [];
    var rainfall = [];
    weather.list.forEach(function(time){
      times.push(time.dt_txt);
      temperatures.push((time.main.temp - 273).toFixed(1));
      cloudCover.push(time.clouds.all);
      windSpeed.push(time.wind.speed);
      windDirection.push(time.wind.deg);
      rainfall.push(time.rain["3h"])
      //damn 3h ruining my code...
      
    })
    
    console.log("rainfall", rainfall);
    

    var temperatureSeries = [];
    var windSpeedSeries = [];
    var cloudCoverSeries = [];
    var rainfallSeries = [];

    for(var i = 0; i < times.length; i++){
      temperatureSeries.push([ times[i], + temperatures[i]]);
      windSpeedSeries.push([ times[i], + windSpeed[i]]);
      cloudCoverSeries.push([ times[i], + cloudCover[i]]);
      rainfallSeries.push([times[i], +rainfall[i]]);
    };
    
    //Temperatures not appearing on the graph...
  
    new LineChart(chartContainer1, chartTitleTemp, temperatureSeries, times)
    new LineChart(chartContainer2, chartTitleWindspeed, windSpeedSeries, times)
    new LineChart(chartContainer3, chartTitleCloudCover, cloudCoverSeries, times)
    // new ColumnChart(chartTitleRainfall, rainfallSeries, times)
    new LineChart(chartContainer4, chartTitleRainfall, rainfallSeries, times)


    
  }
}

module.exports = WeatherView;