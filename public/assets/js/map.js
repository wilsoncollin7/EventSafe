/* eslint-disable no-multiple-empty-lines */
/* eslint-disable no-undef */

window.onload = function () {
  // ---------- get map function, needs coordinates of the city to search ----------
  const loc = $('#location').text();
  let map;
  let myMapType;

  const geocode = function () {
    $.ajax({
      type: 'GET',
      url: 'https://maps.googleapis.com/maps/api/geocode/json?address=' + loc + '&key=AIzaSyDwjr75wpVbrqdqfwE_Gb41DcE3T8s04wM',
      dataType: 'json',
      success: function (data) {
        initMap(data.results[0].geometry.location);
      }
    });
  };

  geocode();

  const initMap = function (data) {
    map = new google.maps.Map(document.getElementById('map'), {
      center: data,
      zoom: 12,
      mapId: 'e9ec3bf73070e70b',
      disableDefaultUI: true
    });

    const marker = new google.maps.Marker({
      position: data,
      map: map
    });

    // eslint-disable-next-line no-undef
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
    // add myMapType to the inserAt function after the 0 if we want weather
    map.overlayMapTypes.insertAt(0, myMapType);
    marker.setMap(map);
  };
};

// ############## geo location thing ############
// if (navigator.geolocation) {
//   navigator.geolocation.getCurrentPosition(
//     (position) => {
//       lat = position.coords.latitude;
//       lon = position.coords.longitude;
//       console.log(lat);
//       console.log(lon);
//     }
//   );
// } else {
//   console.log('error with maps');
// }

// module.exports = Map;
