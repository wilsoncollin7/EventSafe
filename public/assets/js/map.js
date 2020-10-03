/* eslint-disable no-undef */
window.onload = function () {
  // ----- set the loc from the text of the detail card -----
  const loc = $('#location').text();
  let map;
  let myMapType;
  // ----- geocode the location name and turn it into coordinates -----
  const geocode = function () {
    $.ajax({
      type: 'GET',
      url: 'https://maps.googleapis.com/maps/api/geocode/json?address=' + loc + '&key=AIzaSyDwjr75wpVbrqdqfwE_Gb41DcE3T8s04wM',
      dataType: 'json',
      success: function (data) {
        // ----- send the initmap function the coordinates -----
        initMap(data.results[0].geometry.location);
      }
    });
  };
  // ----- call the geocode function to grab the text and turn it into coordinates -----
  geocode();
  // ----- the map function that created the map based off of corrdinates -----
  const initMap = function (data) {
    map = new google.maps.Map(document.getElementById('map'), {
      center: data,
      zoom: 12,
      mapId: 'e9ec3bf73070e70b',
      disableDefaultUI: true
    });
    // ----- this makes the maker that shows the pinned location -----
    const marker = new google.maps.Marker({
      position: data,
      map: map
    });
    // eslint-disable-next-line no-undef
    // ----- this section displays the weather overlay from open weather map -----
    myMapType = new google.maps.ImageMapType({
      getTileUrl: function (coord, zoom) {
        return 'https://tile.openweathermap.org/map/precipitation_new/' + zoom + '/' + coord.x + '/' + coord.y + '.png?appid=51d8d29d59553ece714298da2f3009a6';
      },
      // eslint-disable-next-line no-undef
      tileSize: new google.maps.Size(256, 256),
      maxZoom: 9,
      minZoom: 0,
      name: 'mymaptype'
    });
    // ----- insert the map overlays to display the location and weather -----
    map.overlayMapTypes.insertAt(0, myMapType);
    marker.setMap(map);
  };
};
// ----- geo location grabs the location of the user when a click event is heard -----
$('#loc-addon').on('click', function () {
  let lat = 0;
  let lng = 0;
  let latlngCom = 0;
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        lat = position.coords.latitude;
        lng = position.coords.longitude;
        latlngCom = lat + ', ' + lng;
        // ----- sends the grabbed coordinates to the geocode function to convert coords into an address -----
        geocodeLatLng(latlngCom);
      }
    );
  } else {
    console.log('error with maps');
  }
});
// ----- function that converts the grabbed coordinates into a address to be displayed and saved into the db -----
function geocodeLatLng (latlngCom) {
  const geocoder = new google.maps.Geocoder();
  const input = latlngCom;
  const latlngStr = input.split(',', 2);
  const latlng = {
    lat: parseFloat(latlngStr[0]),
    lng: parseFloat(latlngStr[1])
  };
  geocoder.geocode({ location: latlng }, (results, status) => {
    if (status === 'OK') {
      if (results[0]) {
        $('#event-loc').val(results[0].formatted_address);
        $('#review-loc').val(results[0].formatted_address);
      } else {
        window.alert('No results found');
      }
    } else {
      window.alert('Geocoder failed due to: ' + status);
    }
  });
}
