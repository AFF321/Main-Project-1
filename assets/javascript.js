var btn = $('.btn')
var form = $('#searchTextField')


function initialize() {
  var form = document.getElementById('searchTextField');
  new google.maps.places.autocomplete(form)
}

btn.on('click',initialize)
