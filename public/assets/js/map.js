// ---------- get map function, needs coordinates of the city to search ----------

// function getMap (lat, lon) {
//   // setting the map and myMapType variables
//   let map;
//   // let myMapType;
//   // this adds the script tag to the body that activates the google map api
//   const script = $('<script>').attr('src', 'https://maps.googleapis.com/maps/api/js?key=AIzaSyDwjr75wpVbrqdqfwE_Gb41DcE3T8s04wM&callback=initMap&libraries=&v=weekly&map_ids=e9ec3bf73070e70b');
//   script.defer = true;
//   $('#head').append(script);
//   // here we initiate the new map, this requires the script tag that was added to the body above
//   window.initMap = function () {
//     // eslint-disable-next-line no-undef
//     map = new google.maps.Map(document.getElementById('map'), {
//       center: { lat: lat, lng: lon },
//       // zoom item sets the zoom level of the rendering, the lower the number the closer the view port is 8 is a good level, 7 is the default
//       zoom: 8,
//       mapId: 'e9ec3bf73070e70b',
//       // eslint-disable-next-line no-undef
//       mapTypeId: google.maps.MapTypeId.TERRAIN
//     });

//     // ----- this section adds a weather overlay that shows rain, if we want to incoperate weather api -----
//     // eslint-disable-next-line no-undef
//     // myMapType = new google.maps.ImageMapType({
//     //     getTileUrl: function (coord, zoom) {
//     //         return "https://tile.openweathermap.org/map/precipitation_new/" + zoom + "/" + coord.x + "/" + coord.y + ".png?appid=51d8d29d59553ece714298da2f3009a6";
//     //     },
//     //     // eslint-disable-next-line no-undef
//     //     tileSize: new google.maps.Size(256, 256),
//     //     maxZoom: 9,
//     //     minZoom: 0,
//     //     name: "mymaptype"
//     // });
//     // add myMapType to the inserAt function after the 0 if we want weather
//     map.overlayMapTypes.insertAt(0);
//   };
// };

// getMap();

// let map, infoWindow;

// function initMap() {
//   const script = $('<script>').attr('src', 'https://maps.googleapis.com/maps/api/js?key=AIzaSyDwjr75wpVbrqdqfwE_Gb41DcE3T8s04wM&callback=initMap&libraries=&v=weekly&map_ids=e9ec3bf73070e70b');
//   script.defer = true;
//   $('#head').append(script);

//   // eslint-disable-next-line no-undef
//   map = new google.maps.Map(document.getElementById('map'), {
//     center: { lat: -34.397, lng: 150.644 },
//     zoom: 6
//   });
//   // eslint-disable-next-line no-undef
//   infoWindow = new google.maps.InfoWindow();

//   // Try HTML5 geolocation.
//   if (navigator.geolocation) {
//     navigator.geolocation.getCurrentPosition(
//       (position) => {
//         const pos = {
//           lat: position.coords.latitude,
//           lng: position.coords.longitude,
//         };
//         infoWindow.setPosition(pos);
//         infoWindow.setContent('Location found.');
//         infoWindow.open(map);
//         map.setCenter(pos);
//       },
//       () => {
//         handleLocationError(true, infoWindow, map.getCenter());
//       }
//     );
//   } else {
//     // Browser doesn't support Geolocation
//     handleLocationError(false, infoWindow, map.getCenter());
//   }
// }

// function handleLocationError(browserHasGeolocation, infoWindow, pos) {
//   infoWindow.setPosition(pos);
//   infoWindow.setContent(
//     browserHasGeolocation
//       ? 'Error: The Geolocation service failed.'
//       : 'Error: Your browser doesnt support geolocation.'
//   );
//   infoWindow.open(map);
// }

// initMap();
