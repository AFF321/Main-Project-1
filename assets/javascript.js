var btn = $('.btn')
var form = $('#searchTextField')

console.log(form.val())
console.log(btn)

function log(){
  console.log(form.val())
}

function initialize() {
  var input = document.getElementById('searchTextField');
  new google.maps.places.Autocomplete(input);
}



btn.on('click',log)