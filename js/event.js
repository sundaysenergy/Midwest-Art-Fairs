$(document).ready(function() {
  // Datepickers for start and end date
  $('.input-group.start-date').datepicker({
    autoclose: true
  });
  $('.input-group.end-date').datepicker({
    autoclose: true
  });

  // Create gmaps.js object
  var map = new GMaps({
    div: '#map',
    lat: 44.44107850000001,
    lng: -92.14807874603275,
    zoom: 5
  });

  // Set location to current location
  GMaps.geolocate({
    success: function(position) {
      map.setCenter(position.coords.latitude, position.coords.longitude);
    }
  });

  // Create a pin from the address
  $('#find-location').on('click touch', function(e) {
    e.preventDefault();
    GMaps.geocode({
      address: $('#address').val(),
      callback: function(results, status) {
        if (status == 'OK') {
          var latlng = results[0].geometry.location;
          map.setCenter(latlng.lat(), latlng.lng());
          $('#event-latitude').val(latlng.lat());
          $('#event-longitude').val(latlng.lng());
          map.removeMarkers();
          map.addMarker({
            lat: latlng.lat(),
            lng: latlng.lng(),
            draggable: true,
            dragend: function(e) {
              var marker = map.markers.length;
              $('#event-latitude').val(map.markers[marker-1].getPosition().lat());
              $('#event-longitude').val(map.markers[marker-1].getPosition().lng());
            }
          });
          map.setZoom(13);
        }
      }
    });
  });
});