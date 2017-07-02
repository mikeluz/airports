const drawMap = () => {

	let map;
  return function initMap(createMap) {
    map = new google.maps.Map(document.getElementById('map'), {
      center: {lat: 44.375163, lng: -100.319996},
      zoom: 4,
      mapTypeId: 'satellite'
    });
    return map;
  };

};

const generateInfoWindow = airport => {

      let contentString = `<div id="content" style="background-color: transparent"><div id="siteNotice"></div>
      <h2 id="firstHeading" class="firstHeading">${airport.name}</h2>
      <div id="bodyContent">
      <p>Elevation: ${airport.elevation_ft} feet</p>
      <p>City: ${airport.municipality}</p>
      <p><a href=${airport.wikipedia_link} target="_blank">Wikipedia Entry For ${airport.name}</a></p>
      </div>
      </div>`;

      let infowindow = new google.maps.InfoWindow({
            content: contentString
      });

  return infowindow;
};

const drawMarkersAndRoute = (map, depart, arrive) => {
  // 2. draw markers ////////////////
  let departMarkerCoors = {lat: Number(depart.latitude_deg), lng: Number(depart.longitude_deg)};
  let arriveMarkerCoors = {lat: Number(arrive.latitude_deg), lng: Number(arrive.longitude_deg)};

  let departMarker = new google.maps.Marker({
    position: departMarkerCoors
  });

  let arriveMarker = new google.maps.Marker({
    position: arriveMarkerCoors
  });

  departMarker.setMap(map);
  arriveMarker.setMap(map);

  // // 3. create info windows ///////////////
  generateInfoWindow(depart).open(map, departMarker);
  generateInfoWindow(arrive).open(map, arriveMarker);
  // /////////////////////////////////////

  // // 4. draw route using Polyline -- no "FLIGHT" travel option in directions service :(
  let line = new google.maps.Polyline({
    path: [
        departMarkerCoors, 
        arriveMarkerCoors
    ],
    geodesic: true,
    strokeColor: "#FF0000",
    strokeOpacity: 1.0,
    strokeWeight: 4,
    map: map
  }); 

}

module.exports = {
	drawMap,
	generateInfoWindow,
  drawMarkersAndRoute
};