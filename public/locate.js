if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(success, error);
} else {
  alert('Your browser does not support geolocation.');
}
function success (position) {
  console.log(position);
  var lat = document.getElementById('lat'),
      lon = document.getElementById('lon');
  lat.value = position.coords.latitude;
  lon.value = position.coords.longitude;
}
function error (err) {
  alert(err);
}