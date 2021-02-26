var mapEl =$('#mapEl')
var submitBtnEl = $("#submit-btn")
var btn = $('.btn')

var locaitonFieldEl = $('#searchTextField')

let map;
function initMap(lat, lng) {
  
  map = new google.maps.Map(document.getElementById("map"), {
    zoom: 15,
    center: new google.maps.LatLng(lat || 34.0592, lng || -118.2247),

  });
 
}


  
var results = $("#results")
 function showWeather (){
  navigator.geolocation.getCurrentPosition(function(position) {
    var lat = position.coords.latitude;
    var lng = position.coords.longitude;
    var queryURL = "http://api.weatherapi.com/v1/current.json?key=d1567a95b99d4906ae640957212602&q=" + lat + "," + lng
    getWeather(queryURL)
  })
}
$("#reset-btn").on("click", function(){
  results.empty()
  showWeather()
} )



function getWeather(url) {
  $.ajax({ 
    url: url})
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
  var date_epoh = $("<div>").addClass("card-text").text("WindMph: " + data.current.wind_mph)
  
  div.append(gust)
  div.append(humidity)  
  div.append(day)  
  div.append(tempf)  
  div.append(uv)  
  div.append(mph)  
  results.append(div)
  })
  
}
showWeather()





//  btn.on('click', initMap)
 $("#test").on("click", function() {
   var lat = 34.0922
   var lng = -118.6247
   initMap(lat, lng)
  // console.log(lat)
  // console.log(lng)
 }) 
 












