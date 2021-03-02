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
      zoom: 13,

      styles: [
        { elementType: "geometry", stylers: [{ color: "#242f3e" }] },
        { elementType: "labels.text.stroke", stylers: [{ color: "#242f3e" }] },
        { elementType: "labels.text.fill", stylers: [{ color: "#746855" }] },
        {
          featureType: "administrative.locality",
          elementType: "labels.text.fill",
          stylers: [{ color: "#d59563" }],
        },
        {
          featureType: "poi",
          elementType: "labels.text.fill",
          stylers: [{ color: "#d59563" }],
        },
        {
          featureType: "poi.park",
          elementType: "geometry",
          stylers: [{ color: "#263c3f" }],
        },
        {
          featureType: "poi.park",
          elementType: "labels.text.fill",
          stylers: [{ color: "#6b9a76" }],
        },
        {
          featureType: "road",
          elementType: "geometry",
          stylers: [{ color: "#38414e" }],
        },
        {
          featureType: "road",
          elementType: "geometry.stroke",
          stylers: [{ color: "#212a37" }],
        },
        {
          featureType: "road",
          elementType: "labels.text.fill",
          stylers: [{ color: "#9ca5b3" }],
        },
        {
          featureType: "road.highway",
          elementType: "geometry",
          stylers: [{ color: "#746855" }],
        },
        {
          featureType: "road.highway",
          elementType: "geometry.stroke",
          stylers: [{ color: "#1f2835" }],
        },
        {
          featureType: "road.highway",
          elementType: "labels.text.fill",
          stylers: [{ color: "#f3d19c" }],
        },
        {
          featureType: "transit",
          elementType: "geometry",
          stylers: [{ color: "#2f3948" }],
        },
        {
          featureType: "transit.station",
          elementType: "labels.text.fill",
          stylers: [{ color: "#d59563" }],
        },
        {
          featureType: "water",
          elementType: "geometry",
          stylers: [{ color: "#17263c" }],
        },
        {
          featureType: "water",
          elementType: "labels.text.fill",
          stylers: [{ color: "#515c6d" }],
        },
        {
          featureType: "water",
          elementType: "labels.text.stroke",
          stylers: [{ color: "#17263c" }],
        },
      ],


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
 

// Matthew API

var results = $("#results")                 // Created function 
  function showWeather (){
    navigator.geolocation.getCurrentPosition(function(position) {           // The buildt in geo locater in your brownser  gets your current location  and saves the lat and long into variables then inside of then your API URL
      var lat = position.coords.latitude;
      var lng = position.coords.longitude;
      var queryURL = "https://api.weatherapi.com/v1/forecast.json?key=d1567a95b99d4906ae640957212602&q=" + lat + "," + lng + "&days=5" //adding the lat and lon variables into our api to locate our exact location
      getWeather(queryURL);
    })
  };
  
  $("#reset-btn").on("click", function(){                 //reset button self explantory
    results.empty()
    showWeather()
  })
  
  
  
  function getWeather(url) {          //Calling get weather with our URL that we created in the showWeather function and we use it for our ajax
    $.ajax({      // ajax = jqery version of fetch
      url: url})
    .then(function (data){
     console.log(data)
    var div = $("<div>").addClass("card borderBx")
    var city = $("<div>").addClass("card-title").text("City: " +data.location.name+ "\n Region  "+data.location.region+", Country "+data.location.country+", Lat  "+data.location.lat+", Lon  "+data.location.lon)
    div.append(city)
    var forecast = data.forecast.forecastday[0].day.condition.icon
    var gust = $("<div>").addClass("card-text").text("Gust: " + data.current.gust_mph)
    var humidity = $("<div>").addClass("card-text").text("Humidity: " + data.current.humidity)
    var day = $("<div>").addClass("card-text").text("Day: " + data.current.is_day)
    var tempf = $("<div>").addClass("card-text").text("Temperature:" + data.current.temp_f)
    var uv = $("<div>").addClass("card-text").text("Uv: " + data.current.uv)
    var mph = $("<div>").addClass("card-text").text("WindMph: " + data.current.wind_mph)
    var image = $("<img>").addClass("forecast-img ").attr( "src","https:" + forecast )
    
    div.append(gust)
    div.append(humidity)  
    div.append(day)  
    div.append(tempf)  
    div.append(uv)  
    div.append(mph)  
    div.append(image)
    results.append(div)  // adding everything into div and put everything inside my  HTML




  
    
    })
    
  };
  showWeather()

  submitBtnEl.on("click", function(e) {        
    results.empty();
    e.preventDefault();
    var value = locaitonFieldEl.val().replace(" ", "_") 
    var queryURL = "https://api.weatherapi.com/v1/forecast.json?key=d1567a95b99d4906ae640957212602&q=" + value
  
    getWeather(queryURL);
  });

 // how you search a location submit button calls get weather inside function
 
  // Matthew API end
  
  
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
 












