var mapEl =$('#mapEl')

var btn = $('.btn')
var form = $('#searchTextField')

  function initMap() {
    map = new google.maps.Map(document.getElementById("map"), {
      
      zoom: 8,
    });
  }
  
var weather = $("#weather")
 function showWeather (){
 $.ajax({ 
   url:"http://api.weatherapi.com/v1/current.json?key=d1567a95b99d4906ae640957212602&q=Los_angeles"})
 .then(function (data){
  console.log(data)
var div = $("<div>").addClass("card")
var city = $("<div>").addClass("card-title").text("City: " +data.location.name+ "\n Region  "+data.location.region+", Country "+data.location.country+", Lat  "+data.location.lat+", Lon  "+data.location.lon)
div.append(city)

var gust = $("<div>").addClass("card-text").text("Gust: " + data.current.gust_mph)
var humidity = $("<div>").addClass("card-text").text("Humidity: " + data.current.humidity)
var day = $("<div>").addClass("card-text").text("Day: " + data.current.is_day)
var tempf = $("<div>").addClass("card-text").text("Temperature:" + data.current.temp_f)
var uv = $("<div>").addClass("card-text").text("Uv: " + data.current.uv)
var mph = $("<div>").addClass("card-text").text("WindMph: " + data.current.wind_mph)

div.append(gust)
div.append(humidity)  
div.append(day)  
div.append(tempf)  
div.append(uv)  
div.append(mph)  
weather.append(div)
})
}
showWeather()



// btn.on('click',)     /DO NOT RUN YET











