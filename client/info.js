const generateInfoWindow = airport => {

      let contentString = `<div id="content"><div id="siteNotice"></div>
      <h2 id="firstHeading" class="firstHeading">${airport.name}</h2>
      <div id="bodyContent">
      <p><a href=${airport.wikipedia_link} target="_blank">Wikipedia Entry For ${airport.name}</a></p>
      </div>
      </div>`;

      let infowindow = new google.maps.InfoWindow({
            content: contentString
      });

  return infowindow;
};

export default generateInfoWindow;