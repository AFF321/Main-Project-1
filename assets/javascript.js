var mapEl =$('#mapEl')
var submitBtnEl = $("#submit-btn")
var btn = $('.btn')

var locaitonFieldEl = $('#searchTextField')


var map;
var service;
var infowindow;
var lat = 34.0522
var lng = -118.2437
//starts the map as well as the infowindow and the place service, also sets the Lat and Lng for the map
function initMap() {
  var area = new google.maps.LatLng(lat  , lng );

  map = new google.maps.Map(document.getElementById('map'), {
      center: area,
      zoom: 13
    });

  var request = {
    location: area,
    radius: '10000',
    
    type: 'gym',
    openNow:true
  };
service = new google.maps.places.PlacesService(map);
service.nearbySearch(request, callback);
 }
 
 //section above creates the map and sets the request to have a radius and specific type of building
 function callback(results, status) {
  if (status == google.maps.places.PlacesServiceStatus.OK) {
    console.log(results[0])
    console.log(results)
//creates the marker for every gym recieved 
  for (var i = 0; i < results.length; i++) {
    createMarker(results[i]);
  }

  function createMarker(place) {
    console.log(place)
    var marker = new google.maps.Marker({
      //sets the name for every gym to be the name it should have normally
        Title: place.name,
        map: map,
        position: place.geometry.location
    });
    var infowindow = new google.maps.InfoWindow({
      content: "<h3>" + place.name + "</h3>"
    });

    //on click it opens the infowindow

google.maps.event.addListener(marker, 'click', function() {
infowindow.open(map,marker);
});
return marker;
  }
};


 };
 
var results = $("#results")
  function showWeather (){
    navigator.geolocation.getCurrentPosition(function(position) {
      var lat = position.coords.latitude;
      var lng = position.coords.longitude;
      var queryURL = "https://api.weatherapi.com/v1/current.json?key=d1567a95b99d4906ae640957212602&q=" + lat + "," + lng
      getWeather(queryURL);
    })
  };
  
  $("#reset-btn").on("click", function(){
    results.empty()
    showWeather()
  })
  
  
  
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
    
  };
  showWeather()

  submitBtnEl.on("click", function(e) {
    results.empty();
    e.preventDefault();
    var value = locaitonFieldEl.val().replace(" ", "_")
    var queryURL = "https://api.weatherapi.com/v1/current.json?key=d1567a95b99d4906ae640957212602&q=" + value
  
    getWeather(queryURL);
  });
  
  
  function grabLocal(url){
    $.ajax({ 
      url: url})
      .then(function(data){
        console.log(data)
        console.log(data.results[0].geometry.location.lat)
        console.log(data.results[0].geometry.location.lng)
        lat = data.results[0].geometry.location.lat
        lng = data.results[0].geometry.location.lng
        initMap(lat,lng)
      })
  };
  



 
submitBtnEl.on("click", function() {
  var value = locaitonFieldEl.val().replace(" ", "+")
  queryURL=  "https://maps.googleapis.com/maps/api/geocode/json?address=" + value + "&key=AIzaSyDksTM9d-dsKYB3T_1_vSptRcYyGhHWBog"
  grabLocal(queryURL)
}); 
 












